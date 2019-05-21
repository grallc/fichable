const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
require('../../models/fiche');
const Fiche = mongoose.model('Fiche');
require('../../models/like');
const Like = mongoose.model('Like');

const validateLikeInput = require('../../validation/like');

router.post('/', (req, res) => {
    const {
        errors,
        isValid
    } = validateLikeInput(req.body);
    
    if(errors.length > 0) {
        return res.status(403).json(errors);
    }

    const session = req.session;
    if (!session.userId) {
        errors.length = 0;
        errors.push({not_logged: "Vous n'êtes pas connecté"});
        return res.status(403).json(errors);
    }
    if (!isValid) {
        return res.status(403).json(errors);
    }

    const newLike = new Like({
        ficheId: req.body.fiche,
        userId: req.session.userId,
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
    });
    newLike.save()

    return res.status(200).json({
        success: `Vous aimez désormais cette fiche`
    })
});

router.delete('/', (req, res) => {
    const {
        errors,
        isValid
    } = validateLikeInput(req.body);
    
    if(errors.length > 0) {
        return res.status(403).json(errors);
    }

    const session = req.session;
    if (!session.userId) {
        errors.length = 0;
        errors.push({not_logged: "Vous n'êtes pas connecté"});
        return res.status(403).json(errors);
    }
    if (!isValid) {
        return res.status(403).json(errors);
    }

    Like.findOneAndRemove({ficheId: req.body.fiche, userId: req.session.userId}, (error, data) => {
        if(error) {
            return res.status(500).json({
                error
            }) 
        } else {
            return res.status(200).json({
                success: `Vous n'aimez plus cette fiche`
            })
        }
    })
});

module.exports = router;