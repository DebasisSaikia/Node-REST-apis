const express = require('express');
const app = express()
const path = require('path')

const PORT = process.env.PORT || 5000;

app.set('view engine', 'ejs');

// app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about')
})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})