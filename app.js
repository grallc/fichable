// Imports liés au serveur web
const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const path = require("path");
const hbs = require("hbs");
const fs = require("fs");
const config = require('./config')
const moment = require('moment')
app.use(require('morgan')('dev'));

// Imports liés à la base de données
const mongoose = require('mongoose');

// Imports liés aux sessions
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
app.use(cookieParser());

// Application the port run in
const port = config.getPort();

// Define MongoURI
mongoose.Promise = global.Promise;
let mongoURI = config.getDatabaseURI()

// Configuration d'Handlebars
app.use(express.static(__dirname + '/public'))

// Cela nous permet de bien traiter les formylaires
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.use(cors());

// Connect the App to the Database
mongoose
    .connect(mongoURI, {
        useNewUrlParser: true
    })
    .then(() => console.log(`MongoDB Connected`))
    .catch(err => console.log(err));

app.use(session({
    secret: config.getAuthSecret(),
    saveUninitialized: true,
    resave: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));

// Partials' folder
hbs.registerPartials(__dirname + "/views/partials");

// Define Handlebars as the main view engine
app.set("view engine", "hbs");

// index.html page
app.get("/", function (req, res) {
    res.redirect('/fiches');
});

// Configuration des Helpers/Fonctions d'Handlebars
app.use('*', (req, res, next) => {
    //  L'utilisateur est-il connecté ? On return true/false
    hbs.registerHelper('isLoggedIn', function (options) {
        if (req.session.userId) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });
    // On formate les dates
    hbs.registerHelper('formatDate', function (dateString) {
        return new hbs.SafeString(
            moment(dateString).format("DD/MM/YYYY à HH:mm")
        );
    });
    // On retourne un message en fonction de l'erreur
    hbs.registerHelper('getMessage', function (id) {
        let message;
        switch (id) {
            case `15`:
                message = `Vous n'êtes pas connecté`
                break;
            case `16`:
                message = `Vous avez bien été déconnecté`
                break;
            case `17`:
                message = `Une erreur est survenue lors de la déconnexion. Veuillez réessayer.`
                break;
            case `18`:
                message = `La fiche a bien été supprimée.`
                break;
            case `17`:
                message = `Une erreur est survenue lors de la suppression. Veuillez réessayer.`
                break;
            case `404`:
                message = `Page introuvable`
                break;
            case `405`:
                message = `Page en construction`
                break;
        }
        return new hbs.SafeString(message);
    });
    // On retourne les clés du captcha
    hbs.registerHelper('getFicheCaptchaKey', () => {
        return config.getFicheCaptchaKey();
    })
    
    hbs.registerHelper('getRegisterCaptchaKey', () => {
        return config.getRegisterCaptchaKey();
    })
    next()
});

// On configure les routeurs
app.use('/', require('./routes/index'));
app.use('/api', require('./routes/api/index'));

// Run the App' !
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});