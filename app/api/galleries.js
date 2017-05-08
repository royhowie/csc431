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

  Meteor.publish('search-galleries', function searchGalleries (start, end) {
    if (!start && !end) {
      this.ready()
      return []
    }

    return Galleries.find({
      date: {
        $gte: start || new Date(0, 0, 0),
        $lte: end || new Date()
       }
    })
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
