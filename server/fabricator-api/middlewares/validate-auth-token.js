module.exports = function () {
  var jwt = require('jsonwebtoken'),
    config = require('../utilities/config');

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

      //Todo: gRPC need to be implemented to fetch Session details
      req.session = tokenData;
      req.token = token;
      next();

    });
  }

  validateToken.unless = require('express-unless');
  return validateToken;
}
