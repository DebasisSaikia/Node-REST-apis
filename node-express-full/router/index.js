const router = require('express').Router()

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

module.exports = router