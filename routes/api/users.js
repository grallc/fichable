const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const ObjectId = require('mongoose').Types.ObjectId;
const Validator = require('validator');
require('../../models/user');

const validateLoginInput = require('../../validation/login');
const validateRegisterInput = require('../../validation/register');
const validateChangePasswordInput = require('../../validation/change-password');

// Load Email Reset utilities
//const sendResetEmail = require('../../utils/forget_password/send-email');

const key = process.env.SECRET_OR_KEY || '{CWw)-#H$!m2fV4DzE5:+6';

// Load models
const User = mongoose.model('User');

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {

    const {
        errors,
        isValid
    } = validateRegisterInput(req.body, req.connection);

    const session = req.session;
    if (session.userId) {
        errors.length = 0;
        errors.push({already_logged: "Vous êtes déjà connecté"});
        return res.status(403).json(errors);
    }
    
    if (!isValid) {
        return res.status(403).json(errors);
    }

    User.findOne({
        username: req.body.username
    }).exec().then(user => {
        if (user) {
            errors.push({username: "Le nom d'utilisateur est déjà utilisé"});
        }
        User.findOne({
            email: req.body.email
        }).then(user => {
            if (user) {
                errors.push({email: "L'adresse email spéficiée est déjà utilisée"});
            }
            if (errors.length > 0) {
                return res.status(403).json(errors);
            }
            // User's URL
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        });
    });
});


// @route   GET api/users/login
// @desc    Login User / returning JWT Token
// @access  Public
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

// @route   GET api/users/
// @desc    List all users
// @access  Private
router.get('/', (req, res) => {
    const errors = {};

    User.find()
        .then(users => {
            if (!users) {
                errors.no_user = getText("api.users.get-user.no-user");
                return res.status(404).json(errors);
            }
            res.json({
                users
            });
        })
        .catch(err => res.status(404).json(err));
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get('/current', (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

// @route   GET api/users/change
// @desc    Change my password
// @access  Private
router.patch('/change', (req, res) => {
    const {
        errors,
        isValid
    } = validateChangePasswordInput(req.body);
    // check validation

    const session = req.session;
    if (!session.userId) {
        errors.length = 0;
        errors.push({not_logged: "Vous n'êtes connecté"});
        return res.status(403).json(errors);
    } else if (!isValid) {
        return res.status(404).json(errors);
    }

    const _id = session.userId;
    const currentPassword = req.body.currentPassword;
    const newPassword = req.body.newPassword;

    User.findById(_id).then((user) => {
        if (!user) {
            errors.push({no_user: "Utilisateur introuvable"});
            return res.status(404).json(errors);
        }

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

// @route   POST api/users/logout
// @desc    Logout user
// @access  Public
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