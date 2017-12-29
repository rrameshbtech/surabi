'use strict';
var TemplateRouter = function (Template) {
  var express = require('express'),
  router = express.Router(),
  controller = require('../controllers/template.controller')(Template);

  ////Routes handing multiple items
  //router.route('/')
  //  .get(controller.getTemplates);
  
  return router;
}

module.exports = TemplateRouter;