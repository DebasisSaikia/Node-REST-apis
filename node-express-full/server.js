const express = require('express');
const app = express()
const path = require('path')

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname) + '/index.html')
})

app.get('/about', (req, res) => {
    res.sendFile(path.resolve(__dirname) + '/about.html')
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})