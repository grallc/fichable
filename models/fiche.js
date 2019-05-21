const mongoose = require('mongoose');
const { Schema } = mongoose;

// Modèle des fiches
var Fiche = new Schema({
    title: {                                        // Intitulé de la fiche
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    description: {                                 // Description de la fiche (courte, affichée sur la page d'accueil)
        type: String,
        required: true,
        minlength: 3,
        maxLength: 300,
        trim: true
    },
    submittedAt: {                                // Date de soumission de la fiche
        type: Date,
        default: Date.now()
    },
    level: {                                      // Classe de la fiche
        type: String,
        default: 'Terminale S'
    },
    img: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2015/01/08/18/26/write-593333_960_720.jpg'
    },
    content: {
        type: String,
        minlength: 3,
        maxLength: 1500,
        trim: true
    },
    _creator:   {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'WAITING'
    },
    level: {
        type: String,
        default: 'Terminale S'
    },
    subject: {
        type: String,
        default: 'Mathématiques'
    }
});

mongoose.model('Fiche', Fiche);