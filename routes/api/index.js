
const express = require('express');
const router = express.Router();

console.log('Initialized /users router');
router.use('/users', require('./users'));

module.exports = router;
