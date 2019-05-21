const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
require('../../models/fiche');
const Fiche = mongoose.model('Fiche');
require('../../models/like');
const Like = mongoose.model('Like');

// Permet de valider le formulaire
const validateLikeInput = require('../../validation/like');

// Route POST permettant de poster un Like
router.post('/', (req, res) => {
    // On vérifie si le formulaire est correct
    const {
        errors,
        isValid
    } = validateLikeInput(req.body);

    // On return les éventuelles erreurs
    if (!isValid) {
        return res.status(403).json(errors);
    }

    // L'utilisateur est-il connecté ?
    const session = req.session;
    if (!session.userId) {
        // Il ne l'est pas. On le bloque.
        errors.length = 0;
        errors.push({not_logged: "Vous n'êtes pas connecté"});
        return res.status(403).json(errors);
    }

    // On crée une nouvelle instance de Like
    const newLike = new Like({
        ficheId: req.body.fiche,
        userId: req.session.userId,
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
    });
    // On la sauvegarde
    newLike.save()

    return res.status(200).json({
        success: `Vous aimez désormais cette fiche`
    })
});

// Route pour supprimer un like 
router.delete('/', (req, res) => {
    /// Vérification du formulaire
    const {
        errors,
        isValid
    } = validateLikeInput(req.body);
    
    // Des erreurs sont là
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