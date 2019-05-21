const mongoose = require('mongoose');
const { Schema } = mongoose;

var Fiche = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    description: {
        type: String,
        required: true,
        minlength: 3,
        maxLength: 300,
        trim: true
    },
    submittedAt: {
        type: Date,
        default: Date.now()
    },
    level: {
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