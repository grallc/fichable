const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
require('../../models/fiche');
const Fiche = mongoose.model('Fiche');
const validateFicheInput = require('../../validation/fiche');

router.post('/submit', (req, res) => {
    console.log
    const {
        errors,
        isValid
    } = validateFicheInput(req.body, req.connection);
    
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


router.get('/all', (req, res) => {
    const session = req.session;
    if (!session.userId) {
        return res.status(403).json({not_logged: "Vous n'êtes pas connecté"});
    }
    Fiche.find().then((fiches) => {
        res.send({
            fiches
        });
    }, (e) => {
        res.status(400).send(e);
    });
});

router.post('/like', (req, res) => {
    const {
        errors,
        isValid
    } = validateFicheInput(req.body, req.connection);
    
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