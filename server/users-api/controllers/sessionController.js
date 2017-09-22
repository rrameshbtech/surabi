'use strict';

var sessionController = function (Session){

  function createSession(req, res){
      var newSession = new Session();
      
      newSession.userId = req.body.userId;
      newSession.firstName = 'Test User';
      newSession.isAuthenticated = true;

      newSession.save();
      res
        .status(201)
        .send(newSession);
  }

  return {
    createSession : createSession
  };

};

module.exports = sessionController;