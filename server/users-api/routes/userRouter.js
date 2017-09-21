'use strict';

var express = require('express');

var userRouter = function (User) {

  var router = express.Router();

  router.route('/')
    .get(function getUser(req, res) {
      res.send('Get all users');
    });

  return router;
};

module.exports = userRouter;
