const express = require('express');
const { getIndex } = require('../controllers/index');
const router = express.Router();

router.get('/', getIndex);

module.exports = router;
