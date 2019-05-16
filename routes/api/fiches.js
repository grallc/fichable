const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
require('../../models/fiche');
const Fiche = mongoose.model('Fiche');
const validateFicheInput = require('../../validation/fiche');
const request = require('request');

router.post('/submit', (req, res) => {
    console.log(req.body)
    if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
        return res.status(403).json({
            error: `Veuillez prouver que vous n'êtes pas un robot`
        })
    }
    // Put your secret key here.
    var secretKey = "6Ldj0KMUAAAAAHnXbyNqZCDHpP2mH_9Jm4vzSrqe";
    // req.connection.remoteAddress will provide IP address of connected user.
    var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + ' 6Ldj0KMUAAAAAHnXbyNqZCDHpP2mH_9Jm4vzSrqe' + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
    // Hitting GET request to the URL, Google will respond with success or error scenario.
    request(verificationUrl, function (error, response, body) {
        body = JSON.parse(body);
        // Success will be true or false depending upon captcha validation.
        if (body.success !== undefined && !body.success) {
            return res.status(403).json({
                error: `Veuillez prouver que vous n'êtes pas un robot`
            })
        }
    });

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