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


User.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens = user.tokens.concat([{access, token}]);

  return user.save().then(() => {
    return token;
  });
};

User.methods.findByToken = function (token) {
  var User = this;
  var decoded;

  try{
    decoded = jwt.verify(token, (process.env.SECRET_OR_KEY || '{CWw)-#H$!m2fV4DzE5:+6'))
  } catch (e) {
    return Promise.reject();
    
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
}

mongoose.model('User', User);