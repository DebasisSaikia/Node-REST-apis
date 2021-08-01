const express = require('express');
const app = express()
const path = require('path')
const routes = require('./router/index')

const PORT = process.env.PORT || 5000;

app.set('view engine', 'ejs');
app.use('/', routes)

// app.use(express.static('public'))


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})