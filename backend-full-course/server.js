const express = require('express')
const app = express()
const path = require('path');

const PORT = process.env.PORT || 5000;

// serving static files
const publicpath = path.resolve(__dirname, 'public');
app.use('public', express.static('static'));

// routes
app.get('/', (req, res) => {
    res.end('<h1>This is express App</h1>')
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})