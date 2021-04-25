const express = require('express')
const app = express()

const PORT = process.env.PORT || 5000;

// routes
app.get('/', (req, res) => {
    res.end('<h1>This is express App</h1>')
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})