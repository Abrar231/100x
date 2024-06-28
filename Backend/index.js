const express = require('express');
const db = require('./models/index.js');
const app = express();
const port = require('./config/config.js').serverPort;
const cookieParser = require('cookie-parser');
const cors = require('cors');

const Routes = require('./routes/index.js');


app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:5173', // The origin from which requests are allowed
    credentials: true, // Allow sending cookies and other credentials
    optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors());

// const allowedOrigins = ['http://localhost:5173'];
// app.use(cors({
//   origin: allowedOrigins
// }));



app.use('/api', Routes);

app.get('/healthcheck', async (req, res) => {
    try {
        await db.sequelize.authenticate();
        await db.sequelize.close();
        res.status(200).send('I am healthy');
    } catch (error) {
        await db.sequelize.close();
        res.status(500).send('Internal Error Occurred');
    }
});

// app.get('/images/avatar/:filename', authenticateUser, (req, res) => {
//     const imagePath = path.join(__dirname, 'uploads/images', req.params.filename);
//     res.sendFile(imagePath);
//     // res.status(200).json({imagePath});
// });

// app.listen(port, () => {
//     console.log('Server started');
// });

module.exports = app;