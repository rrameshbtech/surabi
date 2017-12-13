var mongooseLib = require('mongoose');
var config = require('./utilities/config.js');
var surabiControlsSeeder = require('./seeders/surabi-controls.seeder.js');

mongooseLib.Promise = global.Promise || Promise;

module.exports = {

  // Export the mongoose lib
  mongoose: mongooseLib,

  // Export the mongodb url
  mongoURL: process.env.MONGO_URL || config.connection.mongoDB,

  /*
    Seeders List
    ------
    order is important
  */
  seedersList: {
    surabiControlsSeeder
  }
};
