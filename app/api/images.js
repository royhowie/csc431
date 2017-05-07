import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

export const Images = new Mongo.Collection('images')

if (Meteor.isServer) {
  Meteor.publish('images', function () {
    return Images.find({})
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
