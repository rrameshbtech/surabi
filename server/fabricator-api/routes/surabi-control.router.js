'use strict';
var SurabiControlRouter = function (SurabiControl) {

  var express = require('express'),
  router = express.Router(),
  controller = require('../controllers/surabi-control.controller')(SurabiControl);

  //Routes handing multiple items
  router.route('/')
    .get(controller.getSurabiControls);
  
  return router;
}

module.exports = SurabiControlRouter;