'use strict';
var surabiControlRouter = function (SurabiControl) {

  var express = require('express'),
  router = express.Router(),
  controller = require('../controllers/surabiControlController')(SurabiControl);

  //Routes handing multiple items
  router.route('/')
    .get(controller.getSurabiControls);
  
  return router;
}

module.exports = surabiControlRouter;