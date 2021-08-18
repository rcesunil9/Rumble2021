var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

// load user model
var constants = require('../models/modelConstants');
var UserModel = mongoose.model(constants.UserModel);

// passport : validate login section
module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, (email, password, next) => {
      // validate email
      UserModel.findOne({ email: email }, function (err, user) {
        if (err) { return next(err); }
        if (!user) { return next(null, false, { message: "User not found" }); }
        if (user) {
          // validate password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) { return next(err); }
            if (isMatch) {
              if (user.userRole != undefined && user.userRole == "1") {
                return next(null, user);
              } else {
                return next(null, false, { message: "Not allowed to access this portal" });
              }
            }
            else { return next(null, false, { message: "Invalid password" }); }
          });
        }
      })
    })
  );

  passport.serializeUser(function (user, next) {
    next(null, user._id);
  });

  passport.deserializeUser(function (id, next) {
    UserModel.findById(id, function (err, user) {
      next(err, user);
    });
  });
};