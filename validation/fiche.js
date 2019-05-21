const Validator = require('validator');
const isEmpty = require('./is-empty');
const config = require('../config');
const request = require('request');

// On vérifie si le formulaire de changement de mot de passe est bien formaté 
module.exports = function validateFicheInput(data, connection) {
    let errors = [];

    // On vérifie si tous les champs sont bien remplis
    data['g-recaptcha-response'] = !isEmpty(data['g-recaptcha-response']) ? data['g-recaptcha-response'] : '';
    data.captcha = data['g-recaptcha-response'];
    data.title = !isEmpty(data.title) ? data.title : '';
    data.description = !isEmpty(data.description) ? data.description : '';
    data.content = !isEmpty(data.content) ? data.content : '';
    data.level = !isEmpty(data.level) ? data.level : '';
    data.subject = !isEmpty(data.subject) ? data.subject : '';

    // On demande à l'API de Google si le captcha est correct
    const secretKey = config.getFicheCaptchaSecret();
    const verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + data.captcha + "&remoteip=" + connection.remoteAddress;
    request(verificationUrl, function (error, response, body) {
        body = JSON.parse(body);
        // Le captcha n'a pas été rempli correctement
        if (body.success !== undefined && !body.success) {
            errors.push({invalid_captcha: "Veuillez montrer que vous n'êtes pas un robot"})
        }
    });

    // Le captcha a-t'il été rempli correctement ?
    if (Validator.isEmpty(data.captcha)) {
        errors.push({invalid_captcha: "Veuillez montrer que vous n'êtes pas un robot"})
    }

    // Le titre a-t'il été spécifié ?
    if (Validator.isEmpty(data.title)) {
        errors.push({no_title: "Veuillez spéficier le titre"});
    }

    // La matière a-t'elle été précisée ?
    if (Validator.isEmpty(data.subject)) {
        errors.push({no_subject: "Veuillez spéficier la matière"});
    }

    // La classe a-t'elle été spécifiée ?
    if (Validator.isEmpty(data.subject)) {
        errors.push({no_level: "Veuillez spéficier la classe"});
    }

    // La description a-t'elle été spécifiée ?
    if (Validator.isEmpty(data.description)) {
        errors.push({no_description: "Veuillez spéficier la description"});
    }

    // Le titre est-il trop long ?
    if (data.title.length > 150) {
        errors.push({invalid_title: "Le titre est trop long"});
    }

    // La description est-elle trop longue ?
    if (data.description.length > 150) {
        errors.push({invalid_description: "La description est trop longue"});
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};