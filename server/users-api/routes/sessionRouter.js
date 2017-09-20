var express = require('express');

var sessionRouter = function () {

  var router = express.Router();

  router.route('/')
    .get(function getSession(req, res) {
      res.send('Get all session');
    });

  return router;
};

module.exports = sessionRouter;
