const router = require('express').Router()
const API_KEY = require('../middlewares/api')

/**
 * router level middleware
 * app.use(API_KEY)
 */

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Home Page 1'
    })
})


router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page'
    })
})

/**
 * to pass multiple middleware ,pass array [API_KEY,API_KEY2]
 */

// router.get('/api/products', API_KEY, (req, res) => {
//     res.json([
//         {
//             id: '123',
//             name: 'Google Home'
//         },
//         {
//             id: '145',
//             name: 'Alexa'
//         }
//     ])
// })

module.exports = router