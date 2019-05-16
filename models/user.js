const mongoose = require('mongoose');

const {
  Schema
} = mongoose;

const User = new Schema({
  username: String,
  email: String,
  password: String,
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }],
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