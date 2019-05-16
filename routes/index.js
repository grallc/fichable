
const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
console.log('Initialized /users router');

router.use('/fiches', require('./fiches'));
console.log('Initialized /fiches router');

router.use('/admin', require('./admin'));
console.log('Initialized /admin router');

module.exports = router;
