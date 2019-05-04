const mongoose = require('mongoose');

var Fiche = mongoose.model('Fiche', {
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

module.exports = { Fiche };