module.exports = function () {

  var fillModifierFields = function (req, res, next) {
    req.body.updatedOn = new Date();
    req.body.updatedBy = req.session.userId;

    if(req.method === 'POST') {
      req.body.createdOn = new Date();
      req.body.createdBy = req.session.userId;
    }

    next();
  }

  fillModifierFields.unless = require('express-unless');

  return fillModifierFields;
}
