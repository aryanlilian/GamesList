const express = require('express');
const { getUserRegister, postUserRegister, getUserLogin, postUserLogin } = require('../controllers/auth');
const isLoggedIn = require('../middlewares/authentication').isLoggedIn;
const passportAuthentication = require('../passport/passport-config');
const router = express.Router();

router.get('/register', isLoggedIn, getUserRegister);
router.post('/register', isLoggedIn, postUserRegister);
router.get('/login', isLoggedIn, getUserLogin);
router.post('/login', isLoggedIn, passportAuthentication);

module.exports = router
