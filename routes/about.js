const express = require('express');
const router = express.Router();

// index.html page
router.get("/", function (req, res) {
    res.render("about/about", {
        pageTitle: 'Accueil'
    })
});

// index.html page
router.get("/license", function (req, res) {
    res.render("about/license", {
        pageTitle: 'À propos - License'
    })
});

// index.html page
router.get("/us", function (req, res) {
    res.render("about/us", {
        pageTitle: 'À propos - Les Créateurs de Fichable'
    })
});


module.exports = router;