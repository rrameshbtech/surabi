'use strict';
var express = require('express');

var sessionRouter = function (Session, User) {

  var router = express.Router();

  router.route('/')
    .get(function getSession(req, res) {
      res.send('Get all session');
    })
    .post(function createSession(req, res) {
      var newSession = new Session();
      
      newSession.userId = req.body.userId;
      newSession.firstName = 'Test User';
      newSession.isAuthenticated = true;

      newSession.save();
      res
        .status(201)
        .send(newSession);
    });

  return router;
};

module.exports = sessionRouter;
