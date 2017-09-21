'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var sessionModel = new Schema({
  userId: {
    type: String
  },
  token: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  isAuthenticated: {
    type: Boolean,
    default: false
  },
  validTill: {
    type: Date
  }
});

module.exports = mongoose.model('Session', sessionModel);
