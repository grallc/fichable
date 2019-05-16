const express = require('express');
const router = express.Router();
const async = require('async');

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
                pageTitle: "Nouvelle fiche",
                FICHES_CAPTCHA_KEY: process.env.FICHES_CAPTCHA_KEY || `6Ldj0KMUAAAAAHnXbyNqZCDHpP2mH_9Jm4vzSrqe`
            });
        }
    }
});

// /fiches/ pages
router.get('/', (req, res) => {
    const session = req.session;
    Fiche.find({}).then((fiches) => {
        fiches = fiches.filter(item => item.status === 'PUBLISHED')


        async.forEachOf(fiches, (value, key, callback) => {
            if (!session.userId) {
                fiches[key].content = "";
                fiches[key].img = "";
            }

            Like.find({
                ficheId: fiches[key]._id
            }).then((likes) => {
                fiches[key].likesLength = likes.length
                if (likes.length) {
                    for (let x = 0; x < likes.length; x++) {
                        if (likes[x].userId = session.userId) {
                        } else {
                            fiches[key].userLikes = false;
                        }
                    }
                    
                }
                fiches[key].userLikes = true;
                console.log(fiches[key])
            }).catch((e) => {
                console.log(e);
            })
            callback(null)
        }, (err) => {
            if(err) {
                return console.log(err.message)
            }
            res.render("index", {
                fiches,
                pageTitle: 'Accueil',
                userId: session.userId,
            });
        })

    }, (e) => {
        
    });
});


const processFiches = async(fiches) => {

}

module.exports = router;