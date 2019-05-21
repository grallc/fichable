const express = require('express');
const router = express.Router();

console.log('Initialized /api/users router');
router.use('/users', require('./users'));

console.log('Initialized /api/fiches router');
router.use('/fiches', require('./fiches'));

console.log('Initialized /api/likes router');
router.use('/likes', require('./likes'));


module.exports = router;
