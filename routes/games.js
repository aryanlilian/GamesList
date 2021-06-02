const express = require('express');
const {
    getGamesList, getAddGame, postAddGame, getGameDetails, getDeleteGame, postDeleteGame
} = require('../controllers/games');
const router = express.Router();

router.get('/list', getGamesList);
router.get('/new', getAddGame);
router.post('/new', postAddGame);
router.get('/details/:id', getGameDetails);
router.get('/delete/:id', getDeleteGame);
router.post('/delete/:id', postDeleteGame);

module.exports = router;
