
const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLikeInput(data, req) {
    let errors = [];

    data.fiche = !isEmpty(data.fiche) ? data.fiche : '';
    data.password = !isEmpty(data.password) ? data.fiche : '';

    if (Validator.isEmpty(data.username)) {
        errors.push({no_username: "Veuillez spéficier le nom d'utilisateur"});
    }

    if (!isValidUsername(data.username) && !Validator.isEmail(data.username)) {
        errors.push({invalid_username: "Nom d'utilisateur invalide"});
    }

    if (Validator.isEmpty(data.password)) {
        errors.push({invalid_password: "Mot de passe invalide"});
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};