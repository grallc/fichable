const mongoose = require('mongoose');

const {
  Schema
} = mongoose;

const Like = new Schema({
  userId: String,
  ficheId: String,
  date: {
    type: Date,
    default: Date.now
  }, 
  ip: String
});

mongoose.model('Like', Like);