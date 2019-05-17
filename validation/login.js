
const Validator = require('validator');
const isEmpty = require('./is-empty');
const {isValidUsername, isValidPassword} = require('./is-valid');

module.exports = function validateLoginInput(data, isEmail) {
    let errors = [];

    data.username = !isEmpty(data.username) ? data.username : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (Validator.isEmpty(data.username)) {
        errors.push({no_username: "Please specify the username"});
    }

    if (!isValidUsername(data.username) && !Validator.isEmail(data.username)) {
        errors.push({invalid_username: "Invalid username"});
    }

    if (Validator.isEmpty(data.password)) {
        errors.push({invalid_password: "Invalid password"});
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};