const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const ObjectId = require('mongoose').Types.ObjectId;
const Validator = require('validator');
require('../models/user');
const User = mongoose.model('User');
require('../models/fiche');
const Fiche = mongoose.model('Fiche');

// /users - redirect to /fiches
router.get('/', (req, res) => {
    res.redirect('/');
});

// /users/profile - display profile
router.get('/profile', (req, res) => {
    if (req.session.userId) {
        const session = req.session
        Fiche.find({
            _creator: session.userId
        }).then((fiches) => {
            User.findById(session.userId).then((user) => {
                if(!user) {
                    return res.redirect('/fiches?error=15');
                }
                res.render("profile", {
                    fiches,
                    pageTitle: 'Mon Profil',
                    user
                });
            })

        }, (err) => {
            if (err) {
                return console.log(err.message)
            }
            res.render("index", {
                fiches,
                pageTitle: 'Accueil',
                userId: session.userId
            });
        })
    } else {
        res.redirect('/fiches?error=15')
    }
});

module.exports = router;