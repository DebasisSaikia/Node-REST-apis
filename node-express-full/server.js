const express = require('express');
const app = express()
const path = require('path')
const routes = require('./router/index')
const productRoute = require('./router/products')

const PORT = process.env.PORT || 5000;

app.set('view engine', 'ejs');

/**
 * global middleware
 * app.use(API_KEY)
 */

app.use(express.json())
app.use(routes, productRoute)

app.use(express.static('public'))


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})