const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
require('../../models/fiche');
const Fiche = mongoose.model('Fiche');
const validateFicheInput = require('../../validation/fiche');
const request = require('request');

router.post('/submit', (req, res) => {
    return res.status(200).json({
        KEY: process.env.FICHES_CAPTCHA_KEY || `6Ldj0KMUAAAAAHnXbyNqZCDHpP2mH_9Jm4vzSrqe`,
        SECRET: process.env.FICHES_CAPTCHA_SECRET || "6Ldj0KMUAAAAAHnXbyNqZCDHpP2mH_9Jm4vzSrqe"
    });

     if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
         return res.status(403).json({
             error: `Veuillez prouver que vous n'êtes pas un robot`
         })
     }
     const secretKey = process.env.FICHES_CAPTCHA_SECRET || "6Ldj0KMUAAAAAHnXbyNqZCDHpP2mH_9Jm4vzSrqe";
     const verificationUrl = "https:www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
     request(verificationUrl, function (error, response, body) {
         body = JSON.parse(body);
         if (body.success !== undefined && !body.success) {
             return res.status(403).json({
                 error: `Veuillez prouver que vous n'êtes pas un robot`
             })
         }
     });

    const {
        errors,
        isValid
    } = validateFicheInput(req.body);

    const session = req.session;
    if (!session.userId) {
        errors.length = 0;
        errors.push({'not_logged': `Vous n'êtes pas connecté`})
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