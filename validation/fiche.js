
const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateFicheInput(data, isEmail) {
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : '';
    data.description = !isEmpty(data.description) ? data.description : '';
    data.content = !isEmpty(data.content) ? data.content : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (Validator.isEmpty(data.username)) {
        errors.no_username = "Please specify the username";
    }

    if (!isValidUsername(data.username) && !Validator.isEmail(data.username)) {
        errors.username = "Invalid username";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Invalid password";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};