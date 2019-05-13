const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const path = require("path");
const hbs = require("hbs");
const fs = require("fs");

// MongoDB relative imports
const mongoose = require('mongoose');
require('./models/fiche');
const Fiche = mongoose.model('Fiche');

// Authentication relative imports
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
require('./models/user');
app.use(cookieParser());

// Application the port run in
const port = 8080;

// Define MongoURI
mongoose.Promise = global.Promise;
let mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/fichable-dev';

if (process.env.NODE_ENV === 'production') {
    mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/fichable-prod';
}

app.use(express.static(__dirname + '/public'))
app.use(require('morgan')('dev'));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

app.use(cors());
app.use(session({
    key: 'fichable_login',
    secret: (process.env.SECRET_OR_KEY || '{CWw)-#H$!m2fV4DzE5:+6'),
    cookie: {
        maxAge: 60000
    },
    resave: false,
    saveUninitialized: false
}));

// Connect the App to the Database
mongoose
    .connect(mongoURI, {
        useNewUrlParser: true
    })
    .then(() => console.log(`MongoDB Connected`))
    .catch(err => console.log(err));

app.use(session({
    secret: process.env.AUTH_SECRET || ';tcRLfSKq\KPf^d-5~i\_B"',
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
    const session = req.session;
    if (session.userId) {
        console.log(req.session.userId);
    } else {
        console.log(`Vous n'êtes pas connecté`)
    }
    Fiche.find({}).then((fiches) => {
        res.render("index", {
            fiches,
            pageTitle: 'Accueil'
        });
    }, (e) => {
        res.render("index", {
            fichesError: e.message,
            pageTitle: 'Accueil'
        })
    });

});

// /fiches/ pages
app.get('/fiches/:ficheId', (req, res) => {

    if (req.params.ficheId) {
        const ficheId = req.params.ficheId
        if (ficheId === 'new') {
            res.render("fiches/new", {
                pageTitle: "Nouvelle fiche"
            });
        }
    }
});

// /fiches/ pages
app.get('/test', (req, res) => {
    res.sendStatus(200);
});

// /fiches/ pages
app.get('/fiches', (req, res) => {
    Fiche.find({}).then((fiches) => {
        res.render("fiches", {
            fiches,
            pageTitle: 'Toutes les fiches'
        });
    }, (e) => {
        res.render("fiches", {
            fichesError: e.message,
            pageTitle: 'Toutes les fiches'
        })
    });
});


// profile.html page - login/signup/profile
app.get('/profile', (req, res) => {
    res.render("profile", {
        pageTitle: 'Profil'
    });
});

app.use('/api', require('./routes/api/index'));
// Run the App' !
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});