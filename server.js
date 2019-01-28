// ================
// DEPENDENCIES
// ================
const express = require('express')
const app = express()
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const coffeeController = require('./controllers/coffee.js')
const mongoURI = 'mongodb://localhost:27017/' + 'coffee'
const db = mongoose.connection

//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000


//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/'+ `heroku`;

// ================
// MIDDLEWARE
// ================
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use('/coffee', coffeeController)

// connect to Mongo
// -----------------
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })

// connection to error/success
// ---------------------------
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'))
db.on('connected', () => console.log('mongo connected: ', mongoURI))
db.on('disconnected', () => console.log('mongo disconnected'))

// open the connection to mongo
db.on('open', () => {})

// ================
// LISTENER
// ================
app.listen(3000, () => {
  console.log('listening')
})
