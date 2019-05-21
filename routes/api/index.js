const express = require('express');
const router = express.Router();

// On configure les routes en attribuant à une URL un fichier

// Route /api/users
console.log('Initialized /api/users router');
router.use('/users', require('./users'));

// Route /api/fiches
console.log('Initialized /api/fiches router');
router.use('/fiches', require('./fiches'));

// Route /api/likes
console.log('Initialized /api/likes router');
router.use('/likes', require('./likes'));

module.exports = router;
