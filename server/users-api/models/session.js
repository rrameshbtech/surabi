'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var sessionModel = new Schema({
  userName: {
    type: String
  },
  userId: {
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
  } 
});

module.exports = mongoose.model('Session', sessionModel);
