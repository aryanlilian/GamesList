const express = require('express');
const morgan = require('morgan');
const indexRoutes = require('./routes/index');
const app = express();

app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use('/', indexRoutes);
app.use((req, res) => {
    res.status(404).render('404');
})
app.listen(8000, () => console.log('Server is listening on port 8000...!'));
