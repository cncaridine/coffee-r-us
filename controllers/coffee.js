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
router.get('/seed', async (req, res) => {
  const newProducts =
    [
      {
        name: 'The Fill Me Up... Set of 2',
        description: 'If you are tired of making decisions and figuring out your next step, then this mug set is for you. Sometimes coffee is needed. Other times tea is needed. Let the mug decide.',
        img: 'mel-poole-1160858-unsplash.jpg',
        price: 25,
        qty: 10
      }, {
        name: 'Coffee...Coffee Set of 4',
        description: 'Jump start your mug collection with this variety set of mugs.',
        img: 'nathan-dumlao-483396-unsplash.jpg',
        price: 45,
        qty: 8
      }, {
        name: 'My Opinion',
        description: 'Make a great first impression with this mug. Let people know that your opinion is not optional.',
        img: 'steve-johnson-609098-unsplash.jpg',
        price: 10,
        qty: 5
      }, {
        name: 'Engagement Announcement',
        description: 'Make a great first impression with this mug. Let people know that your opinion is not optional ',
        img: 'jose-martinez-776749-unsplash.jpg',
        price: 15,
        qty: 3
      }, {
        name: 'Flamingos and Pigeons',
        description: 'Always stand out in a crowd of coffee lovers with this mug.',
        img: 'bryce-koch-519969-unsplash.jpg',
        price: 15,
        qty: 2
      }, {
        name: 'Coffee Plus Creativity',
        description: 'Nothing can stop a creative genius that has had a hot cup of Joe.',
        img: 'daniel-lincoln-1264346-unsplash.jpg',
        price: 10,
        qty: 5
      }, {
        name: 'No Coffee, No Go',
        description: 'Make a great first impression with this mug. Let people know that your opinion is not optional.',
        img: 'skevin-bhagat-425896-unsplash.jpg',
        price: 8,
        qty: 4
      }, {
        name: 'Simply Lovely',
        description: 'A coffee mug is a gift that keeps giving. It can be used for beverages or a showcase. Do not limit your coffee mug because it will not limit you.',
        img: 'steve-johnson-609098-unsplash.jpg',
        price: 12,
        qty: 7
      }
    ]

  try {
    const seedItems = await coffeeProduct.create(newProducts)
    res.send(seedItems)
  } catch (err) {
    res.send(err.message)
  }
})

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
router.post('/register', (req, res) => {
  coffeeLover.create(req.body, (err, registeredCoffeeLover) => {
    res.redirect('/coffee/')
    // res.send(req.body)
  })
})

// CREATE Route
// ------------------
router.post('/', (req, res) => {
  console.log('string');
  console.log(req.body);
  coffeeProduct.create(req.body, (err, createdItem) => {
  console.log(err);
    res.redirect('/coffee/')
    // res.send(req.body)
  })
})

module.exports = router
