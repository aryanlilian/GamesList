const express = require('express');
const { loginRequired } = require('../middlewares/authentication');
const userCanAccess = require('../middlewares/user-permissions');
const router = express.Router();
const {
    getGamesList, getUserGamesList, getAddGame,
    postAddGame, getGameDetails, getUpdateGame,
    postUpdateGame, getDeleteGame, postDeleteGame
} = require('../controllers/games');

router.get('/list', loginRequired, getGamesList);
router.get('/user/list', loginRequired, getUserGamesList);
router.get('/new', loginRequired, getAddGame);
router.post('/new', loginRequired, postAddGame);
router.get('/details/:id', loginRequired, getGameDetails);
router.get('/update/:id', loginRequired, userCanAccess, getUpdateGame);
router.post('/update/:id', loginRequired, userCanAccess, postUpdateGame);
router.get('/delete/:id', loginRequired, userCanAccess, getDeleteGame);
router.post('/delete/:id', loginRequired, userCanAccess, postDeleteGame);

module.exports = router;
