const Validator = require('validator');
const isEmpty = require('./is-empty');
const { isValidPassword } = require('./is-valid');

const ObjectId = require('mongoose').Types.ObjectId;

module.exports = function validateChangePasswordInput(data) {
    let errors = [];

    data.currentPassword = !isEmpty(data.currentPassword) ? data.currentPassword : '';
    data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : '';
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : '';

    if (Validator.isEmpty(data.currentPassword)) {
        errors.push({no_password: "Veuillez spéficier le mot de passe actuel"});
    }

    if (Validator.isEmpty(data.newPassword)) {
        errors.push({no_newpassword: "Veuillez spéficier le nouveau mot de passe"});
    }

    if (Validator.isEmpty(data.confirmPassword)) {
        errors.push({no_confirmpassword: "Veuillez spéficier la confirmation du nouveau mot de passe"});
    }


    if (!isValidPassword(data.newPassword)) {
        errors.push({invalid_password: "Le nouveau mot de passe est invalide"});
    }

    if (data.newPassword !== data.confirmPassword) {
        errors.push({different_passwords: "La confirmation est différente du nouveau mot de passe"});
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};