const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
require('../models/fiche');
const Fiche = mongoose.model('Fiche');
const validateFicheInput = require('../validation/fiche');

// /fiches/ pages
router.get('/', (req, res) => {
    const session = req.session;
    Fiche.find({}).then((fiches) => {
        if (!session.userId) {
            for (let x = 0; x < fiches.length; x++) {
                fiches[x].content = "";
                fiches[x].img = "";
            }
        }
        fiches = fiches.filter(item => item.status === 'PUBLISHED')
        res.render("index", {
            fiches,
            pageTitle: 'Accueil',
            userId: session.userIdn
        });
    }, (e) => {
        res.render("index", {
            fichesError: e.message,
            pageTitle: 'Accueil'
        })
    });
});

module.exports = router;