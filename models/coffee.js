
const mongoose = require('mongoose')

const coffeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  img: { type: String, required: true },
  price: { type: Number, min: 0 },
  qty: { type: Number, min: 0 }
})

const coffeeProduct = mongoose.model('coffeeProduct', coffeeSchema)

module.exports = coffeeProduct
