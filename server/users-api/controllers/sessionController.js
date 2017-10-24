'use strict';

var sessionController = function (Session, User) {

  var userController = require('./userController')(User),
    jwt = require('jsonwebtoken'),
    config = require('../utilities/config');

  function createSession(req, res) {
    var newSession = new Session();

    userController.getUserByUserName(req.body.userName, (err, user) => {
      if (err) {
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
        var userTokenData = {
          sessionId: currentSession._id,
          userId: user._id
        };
        var loginResponse = {
          firstName: user.firstName,
          email: user.email,
          token: jwt.sign(userTokenData, config.keys.jwtSignKey)
        };

        res
          .status(200)
          .send(loginResponse);
      } else {
        res
          .status(400)
          .send('Invalid user credentials.');
      }
    });
  }

  function getSessionById(sessionId, getCallback) {
    Session.findById(sessionId, getCallback);
  }

  return {
    createSession: createSession,
    getSessionById: getSessionById
  };

};

module.exports = sessionController;
