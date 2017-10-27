'use strict';

var sessionController = function (Session, User) {

  var userController = require('./userController')(User),
    jwt = require('jsonwebtoken'),
    config = require('../utilities/config');

  function createSession(req, res) {
    var newSession = new Session();

    userController.getByUserName(req.body.userName, (err, user) => {
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

        res
          .status(200)
          .send(getSessionResponse(currentSession, jwt.sign(userTokenData, config.keys.jwtSignKey)));
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

  function getSession(req, res) {
    var validateAuth = require('../middlewares/validate-auth-token')();

    validateAuth(req, res, () => {
      res.status(200).send(getSessionResponse(req.session, req.token));
    });

  }

  function getSessionResponse(session, token) {
    return {
      userId: session.userId,
      name: session.firstName + ' ' + session.lastName,
      email: session.email,
      token: token
    }
  }

  return {
    create: createSession,
    get: getSession,
    getSessionById: getSessionById
  };

};

module.exports = sessionController;
