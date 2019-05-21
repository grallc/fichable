const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const ObjectId = require('mongoose').Types.ObjectId;
const Validator = require('validator');
require('../../models/user');

// Validation des formulaires
const validateLoginInput = require('../../validation/login');
const validateRegisterInput = require('../../validation/register');
const validateChangePasswordInput = require('../../validation/change-password');

// On charge les modèles
const User = mongoose.model('User');

// /api/users/register, permettant de créer un utilisateur
router.post('/register', (req, res) => {
    // On vérifie le formulaire
    const {
        errors,
        isValid
    } = validateRegisterInput(req.body, req.connection);

    // L'utilisateur est déjà connecté ?
    const session = req.session;
    if (session.userId) {
        // Il l'est, on le bloque.
        errors.length = 0;
        errors.push({already_logged: "Vous êtes déjà connecté"});
        return res.status(403).json(errors);
    }
    
    // Des erreurs sont présentes.
    if (!isValid) {
        return res.status(403).json(errors);
    }

    // On cherche les utilsateurs dadns la base de données par nom d'utilisateur
    User.findOne({
        username: req.body.username
    }).exec().then(user => {
        // Un utilisateur existe déjà, on le bloque
        if (user) {
            errors.push({username: "Le nom d'utilisateur est déjà utilisé"});
        }
        // Même recherche mais via email
        User.findOne({
            email: req.body.email
        }).then(user => {
            // Un utilisateur existe déjà, on le bloque
            if (user) {
                errors.push({email: "L'adresse email spéficiée est déjà utilisée"});
            }
            // On affiche d'éventuelles errurs
            if (errors.length > 0) {
                return res.status(403).json(errors);
            }
            // On crée l'utilisateur
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            });
            
            // On hash le mot de passe
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    // On sauvegarde l'utilisateur
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        });
    });
});

// Route permettant de login un utilisateur
router.post('/login', (req, res) => {
    const {
        errors,
        isValid
    } = validateLoginInput(req.body);

    const session = req.session;
    if (session.userId) {
        errors.length = 0;
        errors.push({already_logged: "Vous êtes déjà connecté"});
        return res.status(403).json(errors);
    }

    const username = req.body.username.toLowerCase();
    const password = req.body.password;
    var credentials = {};
    if (username.includes("@")) {
        credentials.email = username;
    } else {
        credentials.name = username;
    }

    // Find user by email or username
    User.findOne(credentials)
        .then(user => {
            // check for user
            if (!user) {
                errors.push({not_found: "Identifiants incorrects"});
                return res.status(403).json(errors);
            }
            // check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        req.session.userId = user._id
                        return res.status(200).end(('Vous êtes désormais connecté'));
                    } else {
                        errors.push({password: "Identifiants incorrects"});
                        return res.status(403).json(errors);
                    }
                })
        })
});

// ROuterp our changer le ot de passe de l'utilisateur
router.patch('/change', (req, res) => {
    const {
        errors,
        isValid
    } = validateChangePasswordInput(req.body);
    // check validation

    // On vérifie s'il est connecté
    const session = req.session;
    if (!session.userId) {
        errors.length = 0;
        errors.push({not_logged: "Vous n'êtes pas connecté"});
        return res.status(403).json(errors);
    } else if (!isValid) {
        return res.status(404).json(errors);
    }

    const _id = session.userId;
    const currentPassword = req.body.currentPassword;
    const newPassword = req.body.newPassword;

    // On cherche si l'utilisateur existe dans la BDD
    User.findById(_id).then((user) => {
        if (!user) {
            errors.push({no_user: "Utilisateur introuvable"});
            return res.status(404).json(errors);
        }
        // Changement de MDP
        bcrypt.compare(currentPassword, user.password).then(isMatch => {
            if (isMatch) {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newPassword, salt, (err, hash) => {
                        if (err) throw err;
                        user.password = hash;
                        user.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });
            } else {
                errors.push({incorrect_password: "Mot de passe incorrect"});
                return res.status(404).json(errors);
            }
        });
    });
});

// Route pour déconnecter l'utilisateur
router.post('/logout', (req, res) => {
    if (req.session) {
        // delete session object
        req.session.destroy((err) => {
          if(err) {
            return res.sendStatus(404);
          } else {
            return res.sendStatus(200);
          }
        });
      }
});


module.exports = router;