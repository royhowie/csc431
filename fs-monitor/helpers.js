const Mongo = require('mongodb').MongoClient
const database = require('./database.config.js')
const fs = require('fs.promised')
const path = require('path')
const C = require('./constants.js')
const random = require('meteor-random')

function connect () {
  if (HELPERS.DATABASE) {
    return Promise.resolve(HELPERS.DATABASE)
  }
  return new Mongo.connect(database.url).then(db => {
    return Promise.resolve(HELPERS.DATABASE = db)
  })
}

function getCollection (collection) {
  return connect().then(db => db.collection(collection))
}

const HELPERS = {
  DATABASE: null,
  getDateFromPath (path) {
    let match = path.match(/\/(\d+)\//)

    if (match === null) {
      return match
    }
    match = match[1]

    return new Date(
      match.slice(0, 4),      // year
      match.slice(4,6) - 1,   // month uses zero indexing
      match.slice(6,8)        // day
    )
  },
  getOrCreateGallery (name, date=null, location=null) {
    return getCollection('galleries').then(galleries =>
      galleries.update(
        { name },
        { $set: { id: random.id(), name, date, location } },
        { upsert: true }
      ).then(res => {
        return galleries.find({ name }).toArray()
      })
    )
  },
  toggleChildren (root, src, recurse) {
    // Find all children in the given directory and map them to their full file
    // path, i.e. the path from root.
    return fs.readdir(src).then(children => {
      return children.map(child => path.join(src, child))

    // Map each path to the pair [path, fs.stat].
    }).then(paths => Promise.all(
        paths.map(path => Promise.all([ path, fs.stat(path) ]))
    )).then(pairs => Promise.all(
      pairs.map(([ path, stat ]) => {
        // If the child is a file, update it in the database based on inode, as
        // that is the only invariant metric available.
        let inode = stat.ino
        if (stat.isFile()) {
          return getCollection('images').then(files =>
            files.update(
              { inode },
              { $set: { path } },
              { upsert: false }
            )
          )
        // Otherwise, recurse on children which are directories.
        } else {
          return recurse(root, path, C.IsDir | C.Renamed)
        }
      }))
    )
  },
  toggleFile (root, short_path, date) {
    let full_path = path.join(root, short_path)
    let gallery_name = short_path.split('/')[1]
    return HELPERS.getOrCreateGallery(gallery_name, date, root)
    .then(gallery => {
      return fs.stat(full_path).catch(err => null).then(stat => {
        if (stat) {
          let inode = stat.ino
          return getCollection('images').then(files =>
            files.update(
              { inode },
              { $set: { path: short_path, gallery: gallery[0].id } },
              { upsert: true }
            )
          )
        } else {
          return getCollection('images').then(files =>
            files.remove({ path: short_path })
          )
        }
      })
    })
  },
}

module.exports = HELPERS
