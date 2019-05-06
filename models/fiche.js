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
        trim: true
    },
    submittedAt: {
        type: Number,
        default: null
    },
    _creator: {
        type: String,
        required: true
    }
});

module.exports = { "Fiche", Fiche };