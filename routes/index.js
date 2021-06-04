const express = require('express');
const { getIndex } = require('../controllers/index');
const isLoggedIn = require('../middlewares/authentication').isLoggedIn;
const router = express.Router();

router.get('/', isLoggedIn, getIndex);

module.exports = router;
