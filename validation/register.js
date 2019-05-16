
const Validator = require('validator');
const isEmpty = require('./is-empty');
const {isValidUsername, isValidPassword} = require('./is-valid');


module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.name =!isEmpty(data.username) ? data.username : '';
    data.email =!isEmpty(data.email) ? data.email : '';
    data.password =!isEmpty(data.password) ? data.password : '';
    data.password2 =!isEmpty(data.password2) ? data.password2 : '';



    if (Validator.isEmpty(data.name)) {
        errors.username = "Veuillez spécifier un nom d'utilisateur";
    }

    if (!isValidUsername(data.username)) {
        errors.username = "Veuillez spécifier un nom d'utilisateur correct";
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "Veuillez spécifier une adresse email";
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = "Veuillez spécifier une adresse email";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Veuillez spécifier un mot de passe";
    }

    if (!isValidPassword(data.password)) {
        errors.password = "Veuillez spécifier un mot de passe";
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Veuillez spécifier un mot de passe correct";
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Les mots de passe ne concordent pas";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
