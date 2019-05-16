const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Fiche = mongoose.model('Fiche');

// /fiches/ pages
router.get('/:ficheId', (req, res) => {
    if (req.params.ficheId) {
        const ficheId = req.params.ficheId
        if (ficheId === 'new') {
            res.render("new", {
                pageTitle: "Nouvelle fiche"
            });
        }
    }
});

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
            userId: session.userIdn,
            captcha: res.recaptcha
        });
    }, (e) => {
        res.render("index", {
            fichesError: e.message,
            pageTitle: 'Accueil'
        })
    });
});

router.post('/submit', (req, res) => {
    const session = req.session;
    if (!session.userId) {
        return res.status(403).json({
            error: `Vous n'êtes pas connecté`
        })
    }

    const {
        errors,
        isValid
    } = validateFicheInput(req.body);

    // check validation
    if (!isValid) {
        return res.status(403).json(errors);
    }

    const newFiche = new Fiche({
        title: req.body.title,
        description: req.body.description,
        _creator: session.userId
    });
    newFiche.save()

    return res.status(200).json({
        success: `La fiche a bien été créée et sera publiée après validation`
    })

});

module.exports = router;