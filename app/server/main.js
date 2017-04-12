import { Meteor } from 'meteor/meteor'
import { Galleries } from '../api/galleries.js'
import { Images } from '../api/images.js'

Meteor.startup(() => {
  if (Galleries.find().count() == 0) {
    Array.from(Array(5), (_, i) => {
      return {
        name: `test${i}`,
        date: new Date(2016, 1 + i, 1 + i),
        description: `gallery#${i}`,
        thumbnail: `${i+1}.jpg`,
      }
    }).forEach(gallery => {
      Galleries.insert(gallery)
    })
  }

  const galleries = Galleries.find().fetch()
  let ids = galleries.map(_ => _._id)
  let randomNumber = (max) => {
    return () => max * Math.random() | 0
  }
  let randomIndex = randomNumber(ids.length)

  if (Images.find().count() == 0) {
    Array.from(Array(52), (_, i) => {
      let index = randomIndex()
      return {
        date: new Date(),
        description: `image#${i}`,
        path: `test/200-${i}.jpeg`,
        gallery: ids[index],
      }
    }).forEach(image => {
      Images.insert(image)
    })
  }
})
