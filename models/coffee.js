const mongoose = require('mongoose')

const coffeeSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  img: { type: String},
  price: { type: Number, min: 0 },
  qty: { type: Number, min: 0 }
})

const coffeeProduct = mongoose.model('coffeeProduct', coffeeSchema)

module.exports = coffeeProduct
