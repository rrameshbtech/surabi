'use strict';
var express = require('express');

var sessionRouter = function (Session, User) {

  var sessionController = require('../controllers/sessionController')(Session, User),
    router = express.Router();

  router.route('/')
    .get(function getSession(req, res) {
      res.send('Get all session');
    })
    .post(sessionController.createSession);

  return router;
};

module.exports = sessionRouter;