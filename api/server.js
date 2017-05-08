const Mongo = require('mongodb').MongoClient
const database   = require('./database.config.js')
const port = 5000
const HELPERS = { DATABASE: null }

let express = require('express')
let bodyParser = require('body-parser')
let app = express()
let router = express.Router()

// Log requests to console.
app.use(require('morgan')('dev'))

// Parse the body into json automatically.
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


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

router.route('/images').get(function (req, res) {
  let query = req.query.query
  return getCollection('images').then(images => {
    if (!query) {
      return res.json({ images: [] })
    }

    return images.find(
      { $text: { $search: query } },
      {
        fields: { score: { $meta: 'textScore' } },
        sort: {
          score: { $meta: 'textScore' },
          path: 1,
        },
      }
    ).toArray().then(images => {
      return res.json({ images: images })
    })
  })
})

app.use('/api', router)

app.listen(port)
console.log(`Listening to port ${port}`)
