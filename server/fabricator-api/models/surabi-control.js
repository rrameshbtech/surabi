'use strict';
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var surabiControlModel = new Schema({
  name: {
    type: String,
    unique: true
  },
  displayName:{
    type: String
  },
  icon: {
    type: String
  },
  tag: {
    type: String
  },
  categories: {
    type: [String]
  },
  skills: {
    type: [String]
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

module.exports = mongoose.model('SurabiControl', surabiControlModel);