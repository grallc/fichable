const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
require('../models/fiche');
const Fiche = mongoose.model('Fiche');
require('../models/like');
const Like = mongoose.model('Like');


const validateFicheInput = require('../validation/fiche');

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
        fiches = fiches.filter(item => item.status === 'PUBLISHED')

        let processedFiches = 0;

        for (let x = 0; x < fiches.length; x++) {
            if (!session.userId) {
                fiches[x].content = "";
                fiches[x].img = "";
            }

            Like.find({
                ficheId: fiches[x]._id
            }).then((likes) => {
                fiches[x].likesLength = 12
                if (likes.length) {
                    for (let x = 0; x < likes.length; x++) {
                        if (likes[x].userId = session.userId) {
                            fiches[x].userLikes = true;
                        }
                    }
                }
            }, (e) => {
                console.log(e);
            })

            processedFiches++;
        }
        if (processedFiches >= fiches.length) {
            res.render("index", {
                fiches,
                pageTitle: 'Accueil',
                userId: session.userId,
            });
        }
    }, (e) => {
        res.render("index", {
            fichesError: e.message,
            pageTitle: 'Accueil'
        })
    });
});

module.exports = router;