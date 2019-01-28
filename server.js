// ================
// DEPENDENCIES
// ================
const express = require('express')
const app = express()
const methodOverride = require('method-override')
const mongoose = require('mongoose')

const coffeeProduct = require('./models/coffee.js')

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
// ROUTES
// ================

// SEED Route
// -----------------
// app.get('/coffee/seed', async (req, res) => {
//   const newProducts =
//     [
//       {
//         name: 'Beans',
//         description: 'A small pile of beans. Buy more beans for a big pile of beans.',
//         img: 'https://cdn3.bigcommerce.com/s-a6pgxdjc7w/products/1075/images/967/416130__50605.1467418920.1280.1280.jpg?c=2',
//         price: 5,
//         qty: 99
//       }, {
//         name: 'Bones',
//         description: 'It\'s just a bag of bones.',
//         img: 'http://bluelips.com/prod_images_large/bones1.jpg',
//         price: 25,
//         qty: 0
//       }, {
//         name: 'Bins',
//         description: 'A stack of colorful bins for your beans and bones.',
//         img: 'http://www.clipartbest.com/cliparts/9cz/rMM/9czrMMBcE.jpeg',
//         price: 7000,
//         qty: 1
//       }
//     ]
//
//   try {
//     const seedItems = await coffeeProduct.create(newProducts)
//     res.send(seedItems)
//   } catch (err) {
//     res.send(err.message)
//   }
// })

// DELETE Route
// -----------------
app.delete('/coffee/:id', (req, res) => {
  coffeeProduct.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect('/coffee')
  })
})

// EDIT Route
// ------------------
app.get('/coffee/:id/edit', (req, res)=>{
    coffeeProduct.findById(req.params.id, (err, foundItem) => {
        res.render(
    		'edit.ejs',
    		{
    			item: foundItem
    		}
    	)
    })
})

// BUY Route
// ------------------
app.put('/coffee/buy/:id', (req, res) => {
  coffeeProduct.findByIdAndUpdate(req.params.id, {$inc: {qty: -1}}, {new:true}, (err, boughtProduct) => {
    res.redirect('/coffee')
  })
})

// PUT Route
// ------------------
app.put('/coffee/:id', (req, res) => {
  coffeeProduct.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedModel) => {
    res.redirect('/coffee/');
     })
 })
// INDEX Route
// ------------------
app.get('/coffee/', (req, res) => {
  coffeeProduct.find({}, (err, allItems) => {
    res.render('index.ejs',
    {
      items: allItems
    })
  })
})

// NEW Route
// ------------------
app.get('/coffee/new', (req, res) => {
  res.render('new.ejs')
})

// SHOW Route
// ------------------
app.get('/coffee/:id', (req, res) => {
  coffeeProduct.findById(req.params.id, (err, foundItem) =>
  {
    res.render('show.ejs',
    {
      item: foundItem
    })
  })
})

// CREATE Route
// ------------------
app.post('/coffee/', (req, res) => {
  coffeeProduct.create(req.body, (err, createdItem) => {
    res.redirect('/coffee/');
    // res.send(req.body)
  })
})

// ================
// LISTENER
// ================
app.listen(3000, () => {
  console.log('listening')
})
