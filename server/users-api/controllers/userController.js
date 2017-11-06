'use strict';

var userController = function (User) {

  var passwordGenerator = require('generate-password');

  function getUserById(id, getCallback) {
    User.findById(id, getCallback);
  }

  function getUserByUserName(userName, getCallback) {
    User.findOne({
      'userName': userName
    }, getCallback);
  }

  function getUsers(req, res) {
    var query = {},
      searchableFields = [
        'userName',
        'firstName',
        'lastName',
        'isActive',
        'email',
        'phoneNumber'
      ],
      page = req.query['page'] || 0,
      pageSize = req.query['pagesize'] || 10,
      sort = req.query['sort'] || null,
      direction = req.query['direction'] || 'asc',
      searchQuery = null;

    //build query
    searchableFields.forEach(function (fieldName) {
      if (req.query[fieldName]) {
        query[fieldName] = req.query[fieldName];
      }
    });

    searchQuery = User.find(query)
      .skip(page * pageSize)
      .limit(+pageSize);

    if (sort) {
      var sortConfig = {};
      sortConfig[sort] = direction
      searchQuery = searchQuery.sort(sortConfig);
    }

    searchQuery.exec(
      function (err, users) {
        if (err)
          res.status(500).send(err);
        else {
          User.count(query).exec(function (countErr, count) {
            if (countErr) {
              res.status(500).send(countErr);
            } else {
              res.json({
                data: users,
                totalRecords: count
              });
            }
          });
        }
      });
  }

  function createUser(req, res) {
    var newUser = new User(req.body),
      newPassword = passwordGenerator.generate({
        length: 10,
        numbers: true
      });
    //Todo: encrypt the password with "bcrypt"

    newUser.password = newPassword;
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
    req.user.updatedBy = req.body.updatedBy;
    req.user.updatedOn = req.body.updatedOn;

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
        res.status(204).send(true);
      }
    });
  }

  function resetPassword(req, res) {

    if (req.user.password === req.body.currentPassword) {
      req.user.password = req.body.newPassword;
      req.user.updatedBy = req.body.updatedBy;
      req.user.updatedOn = req.body.updatedOn;
      req.user.save(function (err) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(true);
        }
      });

    } else {
      res.status(400).send('Current password does not match.');
    }

  }

  return {
    getById: getUserById,
    getByUserName: getUserByUserName,
    get: getUsers,
    create: createUser,
    update: updateUser,
    delete: deleteUser,
    resetPassword: resetPassword
  };

};

module.exports = userController;
