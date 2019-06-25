const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
require('../../models/fiche');
const Fiche = mongoose.model('Fiche');
const validateFicheInput = require('../../validation/fiche');

// Lien API pour soumettre une nouvelle fiche
router.post('/', (req, res) => {
    // On commence par vérifier le formulaire
    const {
        errors,
        isValid
    } = validateFicheInput(req.body, req.connection);
    
    // Si des erreurs sont apparues, les retourner
    if (!isValid) {
        return res.status(403).json(errors);
    }

    // L'utilisateur est-il connecté ?
    const session = req.session;
    if (!session.userId) {
        // Il ne l'est pas. On lui signale
        errors.length = 0;
        errors.push({not_logged: "Vous n'êtes pas connecté"});
        return res.status(403).json(errors);
    }

    // On crée la nouvelle instance de la Fiche
    const newFiche = new Fiche({
        title: req.body.title,
        description: req.body.description,
        _creator: session.userId,
        level: req.body.level,
        subject: req.body.subject,
        content: req.body.content
    });
    // On sauvegarde la fiche dans la base de données
    newFiche.save()

    // On signale à l'utilisateur que tout est bon
    return res.status(200).json({
        success: `La fiche a bien été créée et sera publiée après validation`
    })
});

// Lien pour récupérer toutes les fiches
router.get('/all', (req, res) => {
    // L'utilisateur est-il connecté ?
    const session = req.session;
    if (!session.userId) {
        // Il ne l'est pas.
        return res.status(403).json({not_logged: "Vous n'êtes pas connecté"});
    }

    // On récupère toutes les fiches dans la base de données
    Fiche.find().then((fiches) => {
        // On renvoie les fiches à l'utilisateur
        res.send({
            fiches
        });
    }, (e) => {
        // Une erreur est survenue. On renvoie un statut 404  à l'utilisateur.
        res.status(400).send(e);
    });
});

// Route pour supprimer un like 
router.delete('/', (req, res) => {
    // L'utilisaiteur est-il connecté ?
    const session = req.session;
    if (!session.userId) {
        return res.status(403).json({not_logged: "Vous n'êtes pas connecté"});
    } else if(!req.body.fiche) {
        return res.status(403).json({no_fiche: "Veuillez spécifier la fiche"});
    }

    // On supprime le like, après l'avoir recherché dans la base de données
    Fiche.findOneAndRemove({_id: req.body.fiche, _creator: req.session.userId}, (error, data) => {
        if(error) {
            return res.status(500).json({
                error
            }) 
        } else {
            return res.status(200).json({
                success: `Vous avez bien supprimé la fiche. :(`
            })
        }
    })
});

module.exports = router;