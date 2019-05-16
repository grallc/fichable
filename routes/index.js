
const express = require('express');
const router = express.Router();

console.log('Initialized /users router');
router.use('/users', require('./users'));

console.log('Initialized /fiches router');
router.use('/fiches', require('./fiches'));

module.exports = router;
