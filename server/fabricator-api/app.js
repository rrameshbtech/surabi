'use strict';

var express = require("express"),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  config = require('./utilities/config'),
  validateToken = require('./middlewares/validate-auth-token'),
  updateModifierFields = require('./middlewares/update-modifying-fields');

//Assigning 3rd party promise, as mongoose promise is depricated
mongoose.Promise = require('bluebird');

//configure database connections
var dbOptions = {
  useMongoClient: true
};
var db = mongoose.connect('mongodb://localhost/Fabricator', dbOptions);


//import the models requried
var Template = require('./models/template'),
  SurabiControl = require('./models/surabiControl');

//configure the user service
var fabricatorApiApp = express(),
  port = config.port;

//embed middlewares in the http pipe
fabricatorApiApp.use(bodyParser.urlencoded({
  extended: true
}));
fabricatorApiApp.use(bodyParser.json());

//Set CORS parameters to the response
fabricatorApiApp.use(function (req, res, next) {
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS,PATCH");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization ");
  next();
});

//validate the auth tokens and throw error if invalid
fabricatorApiApp.use(validateToken());

//update modifier fields like createdBy, CreatedOn, modifiedBy, ModifiedOn
fabricatorApiApp.use(updateModifierFields());

//import & assign the routes
var templateRouter = require('./routes/templateRouter')(User),
  surabiControlRouter = require('./routes/surabiControlRouter')(Session, User);

fabricatorApiApp.use(`/api/v${config.version}/templates`, templateRouter);
fabricatorApiApp.use(`/api/v${config.version}/surabiControls`, surabiControlRouter);

//Provide dashboard for the users api to let the users know about the list of api end points
fabricatorApiApp.get('/', function getUserAPIDetails(req, res) {
  res.send('Contains APIs for fabricator related actions.');
});

fabricatorApiApp.listen(port, function fabricatorApiAppListener() {
  console.log(`Fabricator API services are running at port ${port}`);
});

module.exports = fabricatorApiApp;
