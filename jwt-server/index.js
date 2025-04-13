const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const errorMiddleware = require('./middlewares/error-middleware');
require('./middlewares/passport');

const router = require('./router/index');

const PORT = process.env.PORT || 5010;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: [process.env.CLIENT_URL],
}));

app.get('/google', (req, res) => {
    res.send('<a href="/api/signIn/google">Authenticate with Google</a>');
})

app.get('/google/redirect', (req, res, next) => {
    res.send('<h1>Redirected by google</h1>');
})
app.use('/api', router);

app.use(errorMiddleware);

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}

start();