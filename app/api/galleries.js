import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { check } from 'meteor/check'

export const Galleries = new Mongo.Collection('galleries')

if (Meteor.isServer) {
  // Ensure we can search galleries by text
  Galleries._ensureIndex({
    name: 'text',
    description: 'text',
  })

  Meteor.publish('galleries', function galleriesPublication () {
    return Galleries.find({})
  })

  Meteor.publish('search-galleries', function searchGalleries (val) {
    if (!val) {
      return Galleries.find({})
    }
    return Galleries.find(
      { $text: { $search: val } },
      { sort: { date: 1 } }
    )
  })

  Meteor.publish('single-gallery', function (_id) {
    check(_id, String)
    const data = Galleries.find({ _id })
    if (data)
      return data
    this.ready()
  })
}

Galleries.schema = new SimpleSchema({
  _id: {
    type: String,
    label: 'Id',
    regEx: SimpleSchema.RegEx.Id,
  },
  name: {
    type: String,
    label: 'Name',
  },
  date: {
    type: Date,
    label: 'Date',
  },
  description: {
    type: String,
    label: 'Description',
  },
  thumbnail: {
    type: String,
    label: 'The picture intended to represent the gallery',
    // regEx: SimpleSchema.RegEx.Id,
  },
})

Galleries.attachSchema(Galleries.schema)

Galleries.helpers({
  getLink () {
    return '/gallery/' + this._id
  },
  getThumbnailLink () {
    return '/img/' + this.thumbnail
  },
})
