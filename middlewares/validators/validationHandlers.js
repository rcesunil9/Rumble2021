const Joi = require('@hapi/joi');

const registerSchema = require('./validationSchemas/registerSchema');
const driverSchema = require('./validationSchemas/driverSchema');
const responseHandler = require("../../services/globalService").responseHandler;

/**
 * validate the request object as per the given req object type and the request schema
 * @param {string} typeString : should be one of the three 'body/params/query'
 * @param {object} schema
 */
var requestWebValidator = function(typeString, schema) {
  var lowerType = typeString.toLowerCase();
  return (req, res, next) => {
    const result = schema.validate(req[lowerType]);
    if (result.error) {
      req.validationError = result.error.details[0].message;
    }
    if (!req.value) {
      req.value = {};
    }
    req.value[lowerType] = result.value;
    next();
  };
};

var requestValidator = function(typeString, schema) {
  var lowerType = typeString.toLowerCase();
  return (req, res, next) => {
    const result = Joi.validate(req[lowerType], schema);
    if (result.error) {
      responseHandler(res, null, result.error.details[0].message, true, 400);
      return 0;
    }
    if (!req.value) {
      req.value = {};
    }
    req.value[lowerType] = result.value;
    next();
  };
};

module.exports = {
  requestWebValidator,
  requestValidator,
  registerSchema,
  driverSchema
};
