'use strict';
var express = require('express');

var SessionRouter = function (Session, User) {

  var sessionController = require('../controllers/session.controller')(Session, User),
    router = express.Router();

  router.route('/')
    .get(sessionController.get)
    .post(sessionController.create);

  return router;
};

module.exports = SessionRouter;