
const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLikeInput(data, req) {
    let errors = [];

    data.fiche = !isEmpty(data.fiche) ? data.fiche : '';

    if (Validator.isEmpty(data.fiche)) {
        errors.push({no_fiche: "Veuillez spéficier la fiche"});
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};