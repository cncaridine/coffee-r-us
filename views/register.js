const mongoose = require('mongoose')

const coffeeLoverSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true }
})

const coffeeLover = mongoose.model('coffeeLover', coffeeLoverSchema)

module.exports = coffeeLover
