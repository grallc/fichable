
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
        errors.username = "Please specify an username";
    }

    if (!isValidUsername(data.username)) {
        errors.username = "Invalid username";
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "Please specify an email adress";
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = "Invalid email adress";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Please specify a password";
    }

    if (!isValidPassword(data.password)) {
        errors.password = "Invalid password";
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Please specify a password";
    }

    if (!isValidPassword(data.password2)) {
        errors.password = "Invalid password confirmation";
    }


    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords don't match";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
