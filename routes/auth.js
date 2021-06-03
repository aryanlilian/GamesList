const express = require('express');
const { getUserRegister, postUserRegister } = require('../controllers/auth');
const router = express.Router();

router.get('/register', getUserRegister);
router.post('/register', postUserRegister);

module.exports = router
