const Validator = require('validator');
const isEmpty = require('./is-empty');
const { isValidPassword } = require('./is-valid');

// On vérifie si le formulaire de changement de mot de passe est bien formaté 
module.exports = function validateChangePasswordInput(data) {
    let errors = [];
    
    // On vérifie si tous les champs sont bien remplis
    data.currentPassword = !isEmpty(data.currentPassword) ? data.currentPassword : '';
    data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : '';
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : '';

    // Le mot de passe actuel est-il précisé ?
    if (Validator.isEmpty(data.currentPassword)) {
        errors.push({no_password: "Veuillez spéficier le mot de passe actuel"});
    }

    // Le mot de passe désiré est-il précisé ?
    if (Validator.isEmpty(data.newPassword)) {
        errors.push({no_newpassword: "Veuillez spéficier le nouveau mot de passe"});
    }

    // La confirmation est-elle précisée ?
    if (Validator.isEmpty(data.confirmPassword)) {
        errors.push({no_confirmpassword: "Veuillez spécifier la confirmation du nouveau mot de passe"});
    }

    // Le nouveau mot de passe est-il suffisamment compliqué ?
    if (!isValidPassword(data.newPassword)) {
        errors.push({invalid_password: "Le nouveau mot de passe est invalide"});
    }

    // Les deux mots de passes sont-ils similaires ?
    if (data.newPassword !== data.confirmPassword) {
        errors.push({different_passwords: "La confirmation est différente du nouveau mot de passe"});
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};