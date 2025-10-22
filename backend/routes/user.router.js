// user.router.js
const express = require('express');
const router = express.Router();
const { test } = require('../controllers/user.controller');

router.get('/test', test);

module.exports = router;
