import express from 'express';
import auth from './routes/auth.js';

const app = express()

app.use(express.json())

app.use('/auth', auth)

const PORT = process.env.PORT || 5000;

// routes
app.get('/', (req, res) => {
    res.send('Hello world')
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})