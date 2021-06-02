const express = require('express');
const { getGamesList, getAddGame, postAddGame } = require('../controllers/games');
const router = express.Router();

router.get('/list', getGamesList);
router.get('/new', getAddGame);
router.post('/new', postAddGame);

module.exports = router;
