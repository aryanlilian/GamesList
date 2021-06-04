const express = require('express');
const { loginRequired, isLoggedIn } = require('../middlewares/authentication');
const passportAuthentication = require('../passport/passport-config');
const router = express.Router();
const {
    getUserRegister, postUserRegister, getUserLogin,
    postUserLogin, getUserLogout
} = require('../controllers/auth');

router.get('/register', isLoggedIn, getUserRegister);
router.post('/register', isLoggedIn, postUserRegister);
router.get('/login', isLoggedIn, getUserLogin);
router.post('/login', isLoggedIn, passportAuthentication);
router.get('/logout', loginRequired, getUserLogout);

module.exports = router
