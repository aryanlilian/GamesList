const express = require('express');
const {
    getGamesList, getUserGamesList, getAddGame, postAddGame, getGameDetails, getDeleteGame, postDeleteGame
} = require('../controllers/games');
const { loginRequired } = require('../middlewares/authentication');
const userCanAccess = require('../middlewares/user-permissions');
const router = express.Router();

router.get('/list', loginRequired, getGamesList);
router.get('/user/list', loginRequired, getUserGamesList);
router.get('/new', loginRequired, getAddGame);
router.post('/new', loginRequired, postAddGame);
router.get('/details/:id', loginRequired, getGameDetails);
router.get('/delete/:id', loginRequired, userCanAccess, getDeleteGame);
router.post('/delete/:id', loginRequired, userCanAccess, postDeleteGame);

module.exports = router;
