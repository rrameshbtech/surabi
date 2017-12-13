'use strict';
var templateRouter = function (Template) {
  var express = require('express'),
  router = express.Router(),
  controller = require('../controllers/templateController')(Template);

  ////Routes handing multiple items
  //router.route('/')
  //  .get(controller.getTemplates);
  
  return router;
}

module.exports = templateRouter;