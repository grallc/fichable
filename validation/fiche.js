const Validator = require('validator');
const isEmpty = require('./is-empty');
const config = require('../config');
const request = require('request');

module.exports = function validateFicheInput(data, connection) {
    let errors = [];

    data['g-recaptcha-response'] = !isEmpty(data['g-recaptcha-response']) ? data['g-recaptcha-response'] : '';
    data.captcha = data['g-recaptcha-response'];
    data.title = !isEmpty(data.title) ? data.title : '';
    data.description = !isEmpty(data.description) ? data.description : '';
    data.content = !isEmpty(data.content) ? data.content : '';

    const secretKey = config.getFicheCaptchaSecret();
    const verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + data.captcha + "&remoteip=" + connection.remoteAddress;
    request(verificationUrl, function (error, response, body) {
        body = JSON.parse(body);
        if (body.success !== undefined && !body.success) {
            errors.push({invalid_captcha: "Veuillez montrer que vous n'êtes pas un robot"})

        }
    });

    if (Validator.isEmpty(data.captcha)) {
        errors.push({invalid_captcha: "Veuillez montrer que vous n'êtes pas un robot"})
    }

    if (Validator.isEmpty(data.title)) {
        errors.push({no_title: "Veuillez spéficier le titre"});
    }

    if (Validator.isEmpty(data.description)) {
        errors.push({no_description: "Veuillez spéficier la description"});
    }

    if (data.title.length > 150) {
        errors.push({invalid_title: "Le titre est trop long"});
    }

    if (data.description.length > 150) {
        errors.push({invalid_description: "La description est trop longue"});
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};