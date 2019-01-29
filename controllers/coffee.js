const express = require('express')
const router = express.Router()
const coffeeProduct = require('../models/coffee.js')
const coffeeLover = require('../views/register.js')

module.exports = router

// ================
// ROUTES
// ================

// SEED Route
// -----------------
// route.get('/coffee/seed', async (req, res) => {
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

// DELETE router
// -----------------
router.delete('/:id', (req, res) => {
  coffeeProduct.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect('/coffee')
  })
})

// EDIT Route
// ------------------
router.get('/:id/edit', (req, res)=>{
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
router.put('/buy/:id', (req, res) => {
  coffeeProduct.findByIdAndUpdate(req.params.id, { $inc: { qty: -1 } }, { new: true }, (err, boughtProduct) => {
    res.redirect('/coffee')
  })
})

// PUT Route
// ------------------
router.put('/:id', (req, res) => {
  coffeeProduct.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedModel) => {
    res.redirect('/coffee/')
  })
})
// INDEX Route
// ------------------
router.get('/', (req, res) => {
  coffeeProduct.find({}, (err, allItems) => {
    res.render('index.ejs',
    {
        items: allItems
      })
  })
})

// NEW Route
// ------------------
router.get('/new', (req, res) => {
  res.render('new.ejs')
})

// SHOW Route
// ------------------
router.get('/:id', (req, res) => {
  coffeeProduct.findById(req.params.id, (err, foundItem) =>
  {
    res.render('show.ejs',
  {
      item: foundItem
    })
  })
})

// SEARCH ROUTE
// resource: https://stackoverflow.com/questions/48589441/implement-a-simple-search-bar-in-express-node-js
// ------------------
router.post('/search/', (req, res) => {
  // console.log(req.body)
  console.log('/search route');
  coffeeProduct.find(
    { name:
      req.body.search }, (err, searchItem) => {
      if (searchItem.length === 0) {
        res.redirect('/coffee/')
      } else {
        // console.log(searchItem);
        res.render('show.ejs',
          {
            item: searchItem[0]
      })
    }
  })
})

// Register Route
// ------------------
router.post('/', (req, res) => {
  coffeeLover.create(req.body, (err, registeredCoffeeLover) => {
    res.redirect('/coffee/')
    // res.send(req.body)
  })
})

// CREATE Route
// ------------------
router.post('/', (req, res) => {
  coffeeProduct.create(req.body, (err, createdItem) => {
    res.redirect('/coffee/')
    // res.send(req.body)
  })
})

module.exports = router
