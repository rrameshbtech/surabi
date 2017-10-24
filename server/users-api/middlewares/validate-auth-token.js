module.exports = function () {
  var jwt = require('jsonwebtoken'),
    config = require('../utilities/config'),
    Session = require('../models/session'),
    User = require('../models/user'),
    SessionController = require('../controllers/sessionController')(Session, User);

  var validateToken = function validateAuthToken(req, res, next) {

    var authorization = req.headers.authorization;
    if (!authorization) {
      res.status(401).send('No valid authorization token found.');
    }

    var token = authorization.split(' ')[1];
    if (!token) {
      res.status(401).send('Authorization token is not formed well.');
      return;
    }

    jwt.verify(token, config.keys.jwtSignKey, function (err, tokenData) {
      if (err) {
        res.status(401).send(err);
        return;
      }
      SessionController.getSessionById(tokenData.sessionId, function(error, currentSession) {
        if(error) {
          res.status(401).send('Current session is expired or invalid.');
        }
        req.session = currentSession;
        next();
      });
      
    });
  }

  validateToken.unless = require('express-unless');
  return validateToken;
}
