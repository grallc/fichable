
const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
console.log('Initialized /users router');

router.use('/fiches', require('./fiches'));
console.log('Initialized /fiches router');

router.use('/admin', require('./admin'));
console.log('Initialized /admin router');

router.use('/about', require('./about'));
console.log('Initialized /about router');

module.exports = router;
