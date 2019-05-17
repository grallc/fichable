
const Validator = require('validator');
const isEmpty = require('./is-empty');
const {isValidUsername, isValidPassword} = require('./is-valid');
const config = require('../config');
const request = require('request');


module.exports = function validateRegisterInput(data, connection) {
    let errors = [];

    data['g-recaptcha-response'] = !isEmpty(data['g-recaptcha-response']) ? data['g-recaptcha-response'] : '';
    data.captcha = data['g-recaptcha-response'];

    const secretKey = config.getFicheCaptchaSecret();
    const verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + data.captcha + "&remoteip=" + connection.remoteAddress;
    request(verificationUrl, function (error, response, body) {
        body = JSON.parse(body);
        if (body.success !== undefined && !body.success) {
            errors.push({invalid_captcha: "Veuillez montrer que vous n'êtes pas un robot"})
        }
    });
    console.log(data)

    data.name =!isEmpty(data.username) ? data.username : '';
    data.email =!isEmpty(data.email) ? data.email : '';
    data.password =!isEmpty(data.password) ? data.password : '';
    data.confirmPassword =!isEmpty(data.confirmPassword) ? data.confirmPassword : '';

    if (Validator.isEmpty(data.captcha)) {
        errors.push({invalid_captcha: "Veuillez montrer que vous n'êtes pas un robot"})
    }

    if (Validator.isEmpty(data.name)) {
        errors.push({no_username: "Veuillez spécifier un nom d'utilisateur"});
    }

    if (!isValidUsername(data.username)) {
        errors.push({username: "Veuillez spécifier un nom d'utilisateur correct"});
    }

    if (Validator.isEmpty(data.email)) {
        errors.push({email: "Veuillez spécifier une adresse email"});
    }

    if (!Validator.isEmail(data.email)) {
        errors.push({email: "Veuillez spécifier une adresse email"});
    }

    if (Validator.isEmpty(data.password)) {
        errors.push({password: "Veuillez spécifier un mot de passe"});
    }

    if (Validator.isEmpty(data.confirmPassword)) {
        errors.push({confirmPassword: "Veuillez confirmer le mot de passse"});
    }

    if (!Validator.equals(data.password, data.confirmPassword)) {
        errors.push({differentsPassword: "Les mots de passe ne concordent pas"});
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
