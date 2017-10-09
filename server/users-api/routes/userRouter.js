'use strict';

var express = require('express');
var userRouter = function (User) {

  var router = express.Router(),
    userController = require('../controllers/userController')(User);

  //Routes handling multiple users
  router.route('/')
    .get(userController.get)
    .post(userController.create);

  //Add middleware to get user for routes with Id 
  router.use('/:userId', function getUserByIdMiddleWare(req, res, next) {

    userController.getById(req.params.userId, afterUserFetched);

    function afterUserFetched(err, user) {
      if (err) {
        req.status(500).send(err);
      } else if (user) {
        req.user = user;
        next();
      } else {
        res.status('404').send('No user found.');
      }
    }
  });

  //Routes handling single user
  router.route('/:userId')
    .get(function getUser(req, res) {
      res.json(req.user);
    })
    .put(userController.update)
    .delete(userController.delete);

  return router;
};

module.exports = userRouter;
