'use strict';

var sessionController = function (Session, User) {

  var userController = require('./userController')(User);

  function createSession(req, res) {
    var newSession = new Session();

    userController.getUserByUserName(req.body.userName, (err, user) => {
      if(err){
        res
        .status(500)
        .send(err);
        return;
      }
      if (user && user.password === req.body.password) {

        if (!user.isActive) {
          res
            .status(400)
            .send('User is not activated. Please contact administrator.');
          return;
        }

        var currentSession = new Session();
        currentSession.userName = user.userName;
        currentSession.firstName = user.firstName;
        currentSession.lastName = user.lastName;
        currentSession.email = user.email;
        currentSession.phoneNumber = user.phoneNumber;
        currentSession.userId = user._id;

        currentSession.save();
        res
          .status(200)
          .send(currentSession);
      } else {
        res
          .status(400)
          .send('Invalid user credentials.');
      }
    });
   }

  return {
    createSession: createSession
  };

};

module.exports = sessionController;
