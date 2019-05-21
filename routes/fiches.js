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
            if (req.session.userId) {
                res.render("new", {
                    pageTitle: "Nouvelle fiche"
                });
            } else {
                res.redirect('/fiches?error=15')
            }
        } else {
            res.redirect('/fiches?error=404')
        }
    }
});

// /fiches/ pages
router.get('/', (req, res) => {
    const session = req.session;

    Fiche.find({}).then((fiches) => {
        //fiches = fiches.filter(item => item.status === 'PUBLISHED')
        if(req.query.subject) {
            fiches = fiches.filter(item => item.subject === req.query.subject)
        }
        if(req.query.level) {
            fiches = fiches.filter(item => item.level === req.query.level)
        }
        async.forEachOf(fiches, (value, key, callback) => {
            if (!session.userId) {
                fiches[key].content = "";
                fiches[key].img = "";
            }

            Like.find({
                ficheId: fiches[key]._id
            }).then((likes) => {
                fiches[key].likesLength = likes.length
                if (likes.length > 0) {
                    for (let x = 0; x < likes.length; x++) {
                        if (likes[x].userId = session.userId) {
                            fiches[key].userLikes = true;
                        } else {
                            fiches[key].userLikes = false;
                        }
                    }

                } else {
                    fiches[key].userLikes = false;
                }
                callback(null)
            }).catch((e) => {
                console.log(e);
            })
        }, (err) => {
            if (err) {
                return console.log(err.message)
            }
            res.render("index", {
                fiches,
                pageTitle: 'Accueil',
                userId: session.userId,
                query: req.query
            });
        })

    }, (e) => {
    });
});

module.exports = router;