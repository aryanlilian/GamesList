const express = require('express');
const morgan = require('morgan');
const indexRoutes = require('./routes/index');
const app = express();

app.use(morgan('dev'));
app.use('/', indexRoutes);
app.listen(8000, () => console.log('Server is listening on port 8000...!'));
