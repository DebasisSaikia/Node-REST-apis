import express from 'express';

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 5000;

// routes
app.get('/', (req, res) => {
    res.send('Hello world')
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})