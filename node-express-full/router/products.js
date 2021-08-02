const router = require('express').Router()
const products = require('../productsData.js')

router.get('/products', (req, res) => {
    res.render('products', {
        title: 'Products Page'
    })
})

router.get('/api/products', (req, res) => {
    res.json(products)
})

router.post('/api/products', (req, res) => {
    // const { name, price } = req.body;
    console.log(req.body)
    res.json({})
})


module.exports = router;