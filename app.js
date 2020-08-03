const express = require("express");
const path = require('path');
const app = express();
const userRoutes = require('./api-new/routes/user');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const cors = require("cors");
const mongoose = require('mongoose')
app.use(cors({
    origin: true,
    credentials: true,
}));


console.log('PASSWORD: ', process.env.MONGO_ATLAS_PW, "SECRET_KEY: ", process.env.MONGO_ATLAS_PW)

// Connecting to the Mongo Atlas database                                         
mongoose.connect('mongodb://chris:sed1sed1@ds021771.mlab.com:21771/heroku_g1j39pl6',
    { useNewUrlParser: true })

mongoose.Promise = global.Promise;


app.set('view engine', 'ejs')

// Set up body parser and Morgan, other middlewear
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/uploads', express.static('build'));
app.use(express.static(path.join(__dirname, 'build')));
app.use(cookieParser());


app.use(cors({
    origin: true,
    credentials: true,
}));

// Set up the products and orders routes

app.use("/user", userRoutes)

// Set up get routes
app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'build', 'home', 'index.html'))
}
)
app.get('/dashboard', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'build', 'dashboard', 'index.html'))
}
)

// Error handling
app.use((req, res, next) => {
    const error = new Error('not found');
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;