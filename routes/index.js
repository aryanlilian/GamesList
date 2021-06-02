const express = require('express');
const { getIndex, getGamesList } = require('../controllers/index');
const router = express.Router();

router.get('/', getIndex);
router.get('/games/list', getGamesList);

module.exports = router;
