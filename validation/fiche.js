const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateFicheInput(data, isEmail) {
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : '';
    data.description = !isEmpty(data.description) ? data.description : '';
    data.content = !isEmpty(data.content) ? data.content : '';

    if (Validator.isEmpty(data.title)) {
        errors.no_title = "Veuillez spéficier le titre";
    }

    if (Validator.isEmpty(data.description)) {
        errors.no_description = "Veuillez spéficier la description";
    }

    if (data.title.length > 150) {
        errors.invalid_title = "Le titre est trop long";
    }

    if (data.description.length > 150) {
        errors.invalid_description = "La description est trop longue";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};