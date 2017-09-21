'use strict';

var express = require("express"),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser');

//configure database connections
var dbOptions = {
  useMongoClient:true
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
