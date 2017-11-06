'use strict';
var express = require('express');

var sessionRouter = function (Session, User) {

  var sessionController = require('../controllers/sessionController')(Session, User),
    router = express.Router();

  router.route('/')
    .get(sessionController.get)
    .post(sessionController.create);

  return router;
};

module.exports = sessionRouter;