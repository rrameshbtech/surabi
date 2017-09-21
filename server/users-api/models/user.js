'use strict';
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var userModel = new Schema({
  userId: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  password: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('User', userModel);