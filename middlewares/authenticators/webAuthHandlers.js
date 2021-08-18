var jwt = require('jsonwebtoken');
var globalService = require('../../services/globalService');

const webAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/admin');
};

const webNotAuthenticated = function (req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/admin/dashboard');
};

module.exports = {
  webAuthenticated,
  webNotAuthenticated
}