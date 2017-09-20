var express = require("express");

var usersApiApp = express(),
  port = 3000;

var userRouter = require('./routes/userRouter')(),
  sessionRouter = require('./routes/sessionRouter')();

usersApiApp.use('/api/users', userRouter);
usersApiApp.use('/api/sessions', sessionRouter);

usersApiApp.get('/', function getUserAPIDetails(req, res) {
  res.send('Contains APIs for users & sessions.');
});


usersApiApp.listen(port, function usersApiAppListener() {
  console.log(`User API services are running at port ${port}`);
});
module.exports = usersApiApp;
