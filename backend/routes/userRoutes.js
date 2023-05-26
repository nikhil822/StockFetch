const express = require('express');
const router = express.Router();

const { getInfo } = require('../controllers/userControllers');

router.get('/', getInfo);

module.exports = router;