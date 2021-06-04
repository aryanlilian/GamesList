const express = require('express');
const {
    getGamesList, getAddGame, postAddGame, getGameDetails, getDeleteGame, postDeleteGame
} = require('../controllers/games');
const { loginRequired } = require('../middlewares/authentication');
const router = express.Router();

router.get('/list', loginRequired, getGamesList);
router.get('/new', loginRequired, getAddGame);
router.post('/new', loginRequired, postAddGame);
router.get('/details/:id', loginRequired, getGameDetails);
router.get('/delete/:id', loginRequired, getDeleteGame);
router.post('/delete/:id', loginRequired, postDeleteGame);

module.exports = router;
