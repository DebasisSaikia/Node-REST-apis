const express = require('express')
const app = express()
const path = require('path');

const PORT = process.env.PORT || 5000;

// serving static files
const publicpath = path.resolve(__dirname, 'public');
app.use('public', express.static('static'));

// setting template
app.set('view engine', 'pug')

// routes
app.get('/', (req, res) => {
    res.render('index')
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})