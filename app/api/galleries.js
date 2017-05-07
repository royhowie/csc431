import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { check } from 'meteor/check'

export const Galleries = new Mongo.Collection('galleries')

if (Meteor.isServer) {
  // Ensure we can search galleries by text
  Galleries._ensureIndex({ name: 'text' })

  Meteor.publish('galleries', function galleriesPublication () {
    return Galleries.find({})
  })

  Meteor.publish('search-galleries', function searchGalleries (val) {
    if (!val) {
      return Galleries.find({})
    }
    return Galleries.find(
      {
        $text: { $search: val },
      },
      {
        fields: { score: { $meta: 'textScore' } },
        sort: { score: { $meta: 'textScore' } },
      }
    )
  })

  Meteor.publish('single-gallery', function (id) {
    check(id, String)
    const data = Galleries.find({ id })
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
  location: {
    type: String,
    label: 'Gallery location on disc',
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
})

Galleries.attachSchema(Galleries.schema)

Galleries.helpers({
  getLink () {
    return '/gallery/' + this.id
  },
})
