import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { check } from 'meteor/check'

export const Images = new Mongo.Collection('images')

function search ($search=null, beginsWith=null) {
  const pipeline = []

  // 0. [optional] Filter images based on a text-based search for $search`.
  if ($search) {
    pipeline.push({ $match: { $text: { $search } } })
  }

  // 1. [optional] If searching within an environment, i.e. somewhere within the
  // tree of the file system, then filter based on whether an image's `path`
  // starts with `beginsWith`.
  if (beginsWith) {
    // Ensure `beginsWith` begins with a forward slash and generate a
    // corresponding regex.
    let token = beginsWith[0] === '/' ? `^${beginsWith}` : `^/${beginsWith}`
    let $regex = new RegExp(beginsWith)

    pipeline.push({ $match: { path: { $regex, $options: 'i' } } })
  }

  // 2. As we are already searching within the context (or environment) of
  // `beginsWith`, we need to remove that from an image's path. Split an image's
  // path based on `beginsWith` and select the second half. Drag the path
  // property along for the ride.
  if (beginsWith) {
    let path_split = `/${beginsWith}`
    pipeline.push({
      $project: {
        sub_path: { $arrayElemAt: [ {$split: ['$path', path_split ]}, 1 ] },
        path: 1,
        inode: 1,
      }
    })
  } else {
    pipeline.push({
      $project: {
        sub_path: {
          $concat: [
            { $arrayElemAt: [ {$split: ['$path', '/' ]}, 1 ] },
            '/'
          ]
        },
        path: 1,
        inode: 1,
      }
    })
  }

  // 3. Determine whether $is_dir is a directory of a file by checking whether
  // it contains a forward slash.
  pipeline.push({
    $project: {
      is_dir: { $ne: [ { $indexOfBytes: [ '$sub_path', '/' ] }, -1 ] },
      sub_path: 1,
      path: 1,
      inode: 1,
    }
  })

  // 4. Split file paths again and select the uppermost directory level.
  pipeline.push({
    $project: {
      is_dir: 1,
      sub_path: { $arrayElemAt: [ {$split: [ '$sub_path', '/' ]}, 0 ] },
      path: 1,
      inode: 1,
    }
  })

  // 5. Group based on the projected $sub_path property.
  pipeline.push({
    $group: {
      _id: '$sub_path',
      path: { $last: '$path' },
      is_dir: { $last: '$is_dir' },
      inode: { $last: '$inode' },
    }
  })

  // 6. Sort by _id with directories at the top.
  pipeline.push({ $sort: { is_dir: -1, _id: 1 } })

  return pipeline
}

if (Meteor.isServer) {
  Images._ensureIndex({ path: 'text' })

  Meteor.publish('images', function () {
    return Images.find({})
  })

  Meteor.publish('single-image', function (inode) {
    check(inode, Number)
    const data = Images.find({ inode: parseInt(inode) })
    if (data)
      return data
    this.ready()
  })

  Meteor.publish('search-images', function (val, beginsWith=null) {
    ReactiveAggregate(this, Images, search(val, beginsWith))
  })
}

Images.schema = new SimpleSchema({
  _id: {
    type: String,
    label: 'Id',
    regEx: SimpleSchema.RegEx.Id,
  },
  path: {
    type: String,
    label: 'Filepath'
  },
  inode: {
    type: Number,
    label: 'Inode of file header',
  },
  gallery: {
    type: String,
    label: 'Gallery Id',
    regEx: SimpleSchema.RegEx.Id,
  },
})

Images.attachSchema(Images.schema)
