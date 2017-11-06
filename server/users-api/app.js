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
var db = mongoose.connect('mongodb://localhost/UserDetails', dbOptions);

//import the models requried
var User = require('./models/user'),
  Session = require('./models/session');

//configure the user service
var usersApiApp = express(),
  port = 3000;

//embed middlewares in the http pipe
usersApiApp.use(bodyParser.urlencoded({
  extended: true
}));
usersApiApp.use(bodyParser.json());

//Set CORS parameters to the response
usersApiApp.use(function (req, res, next) {
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS,PATCH");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization ");
  next();
});

//validate the auth tokens and throw error if invalid
usersApiApp.use(validateToken().unless({
  path: ['/api/sessions/'],
  method: 'OPTIONS'
}));

//update modifier fields like createdBy, CreatedOn, modifiedBy, ModifiedOn

usersApiApp.use(updateModifierFields().unless({
  path:['/api/sessions/'],
  method: ['OPTIONS', 'GET', 'DELETE']
}));

//import & assign the routes
var userRouter = require('./routes/userRouter')(User),
  sessionRouter = require('./routes/sessionRouter')(Session, User);

usersApiApp.use('/api/users', userRouter);
usersApiApp.use('/api/sessions', sessionRouter);

//Provide dashboard for the users api to let the users know about the list of api end points
usersApiApp.get('/', function getUserAPIDetails(req, res) {
  res.send('Contains APIs for users & sessions.');
});

usersApiApp.listen(port, function usersApiAppListener() {
  console.log(`User API services are running at port ${port}`);
});

module.exports = usersApiApp;
