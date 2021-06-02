const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const indexRoutes = require('./routes/index');
const gamesRoutes = require('./routes/games');

// express app
const app = express();

// connect to mongoDB
const dbURI = 'mongodb+srv://aryanlilian:qaqsqdRFRGRH10bl@nodejs.wcaui.mongodb.net/GamesListDB?retryWrites=true&w=majority'
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
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
app.use((req, res) => {
    const context = {
        title: '404'
    }
    res.status(404).render('404', context);
});
