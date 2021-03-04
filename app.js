const express = require('express')
const bodyParser = require('body-parser')
const db = require('./models')
const api = require('./spec/helpers/payload')
const postRoutes = require('./app/api/post')
const authorRoutes = require('./app/api/author')
const eventsRoutes = require('./app/api/events')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('app/public'))

app.get('/', (req, res) => {
  res.status(200).send('Hello.')
})

app.post('/booking', async (req, res) => {
  await db.Booking.create({
    bookingId: req.body.bookingId,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    summary: req.body.summary,
    status: req.body.status
  }).then((result) => res.json(result))
})

app.get('/booking', async (req, res) => {
  await db.Booking.findAll(
    {attributes: ['id', 'bookingId', 'status', 'summary']}
    
  ).then((result) => {
    return res.json(result)
  })
})

app.post('/account', async (req, res) => {
  await db.Account.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName
  }).then((result) => res.json(result))
})

app.get('/account', async (req, res) => {
  await db.Account.findAll(
    {attributes: ['id', 'mail', 'name']}
  ).then((result) => {
    return res.json(result)
  })
})


postRoutes(app, db)
authorRoutes(app, db)
eventsRoutes(app, api)

module.exports = app