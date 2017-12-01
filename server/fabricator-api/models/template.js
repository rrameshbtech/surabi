'use strict';
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var templateModel = new Schema({
  {
    id: {
      type: String
    },
    name: {
      type: String,
      unique: true
    },
    description: {
      type: String
    },
    categories: {
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

  }
});
