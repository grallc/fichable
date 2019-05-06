const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PasswordTokenSchema = new Schema({

    tokenUserId: {
        type: String
    },

    tokenUserEmail: {
        type: String
    },

    creationIp: {
        type: String
    },

    creationDate: {
        type: Date,
        default: Date.now
    }

});

mongoose.model('PasswordToken', PasswordTokenSchema);