const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const {
  Schema
} = mongoose;

const User = new Schema({
  username: String,
  email: String,
  password: String,
  registrationDate: {
    type: Date,
    default: Date.now
  },
  rank: {
    type: String,
    default: "Member"
  }
});

mongoose.model('User', User);