'use strict';

var userController = function (User) {

  function getUserById(id, getCallback) {
    User.findById(id, getCallback);
  }

  function getUsers(req, res) {
    var query = {},
      fieldFields = [
        'userName',
        'firstName',
        'lastName',
        'isActive',
        'email',
        'phoneNumber',
        'address'
      ];

    //build query
    fieldFields.forEach(function (fieldName) {
      if (req.query[fieldName.toLowerCase()]) {
        query[fieldName] = req.query[fieldName.toLowerCase()];
      }
    });

    User.find(query, function (err, users) {
      if (err)
        res.status(500).send(err);
      else {
        res.json(users);
      }
    });
  }

  function createUser(req, res) {
    var newUser = new User(req.body);

    newUser.save();
    res
      .status(201)
      .send(newUser);
  }

  function updateUser(req, res) {
    //update existing user
    req.user.phoneNumber = req.body.phoneNumber;
    req.user.email = req.body.email;
    req.user.firstName = req.body.firstName;
    req.user.lastName = req.body.lastName;
    req.user.address = req.body.address;
    req.user.isActive = req.body.isActive;

    req.user.save(function (err) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(req.user);
      }
    });
  }

  function deleteUser(req, res) {
    req.user.remove(function (err) {
      if (err)
        res.status(500).send(err);
      else {
        res.status(204).send('User deleted successfully.');
      }
    });
  }

  return {
    getById: getUserById,
    get: getUsers,
    create: createUser,
    update: updateUser,
    delete: deleteUser
  };

};

module.exports = userController;
