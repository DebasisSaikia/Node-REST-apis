import express from 'express';
import mongoose from 'mongoose'
import { APP_PORT, DB_URL } from './config';
import errorHandler from './middlewares/errorHandler';
import routes from './routes'

const app = express();

app.use(express.json());

app.use('/api', routes);

// db connection
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error'));
db.once('open', () => {
    console.log('Database Connected !!')
})

app.use(errorHandler);

app.listen(APP_PORT, () => {
    console.log(`Server running on port ${APP_PORT}`);
})