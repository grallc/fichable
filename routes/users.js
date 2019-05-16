const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const ObjectId = require('mongoose').Types.ObjectId;
const Validator = require('validator');
require('../models/user');

// /users - redirect to /fiches
router.get('/', (req, res) => {
    res.redirect('/');
});

// /users/profile - display profile
router.get('/profile', (req, res) => {
    res.render("profile", {
        pageTitle: 'Profil'
    });
});

module.exports = router;