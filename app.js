const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const indexRoutes = require('./routes/index');
const gamesRoutes = require('./routes/games');
const authRoutes = require('./routes/auth');

// express app
const app = express();

// configure dotenv
dotenv.config();

// connect to mongoDB
mongoose.connect(process.env.DB_URI_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
    })
    .then((result) => {
        console.log('Connected to the DB');
        app.listen(8000, () => console.log('Server is listening on port 8000...'))
    })
    .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middlewares & routes
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/', indexRoutes);
app.use('/games', gamesRoutes);
app.use('/auth', authRoutes);
app.use((req, res) => {
    const context = {
        title: '404'
    }
    res.status(404).render('404', context);
});
