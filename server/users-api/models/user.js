'use strict';
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var userModel = new Schema({
  userName: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  address: {
    type: String
  },
  password: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: String
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  updatedBy: {
    type: String
  },
  updatedOn: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userModel);
