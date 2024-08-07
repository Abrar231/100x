const express = require('express');
const db = require('./models/index.js');
const app = express();
const config = require('./config/config.js');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const Routes = require('./routes/index.js');

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: config.corsOrigin,
    credentials: true
}));

app.use('/api', Routes);

app.get('/healthcheck', async (req, res) => {
    try {
        await db.sequelize.authenticate();
        res.status(200).send('I am healthy');
    } catch (error) {
        res.status(500).send('Internal Error Occurred');
    }
});

// app.use('/images', express.static('public/images'));

module.exports = app;