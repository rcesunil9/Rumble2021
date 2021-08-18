const jwt = require("jsonwebtoken");
var _ = require("lodash");
var fs = require("fs");
var yaml = require("js-yaml");

var paramsValidator = require("../configs/params");
var messageList = yaml.safeLoad(fs.readFileSync("./configs/message.yaml"));
var validationPattern = yaml.safeLoad(fs.readFileSync("./configs/validationPattern.yml"));

/**
 * This function is used to get error message
 */
const getErrMsg = function (messageType, messageCode) {
  messageType = messageType.toLowerCase().trim();
  let msg = messageList[messageType][messageCode];
  return new Error(msg.message);
};

/**
 * This function is used to send reply with standard JSON format
 */
const sendMsg = function (messageType, messageCode, req, res, data) {
  messageType = messageType.toLowerCase().trim();
  let msg = messageList[messageType][messageCode];

  if (messageType === "error") {
    res.status(msg.code).json({ status: messageType, message: msg.message });
    return false;
  } else {
    if (data) {
      res.status(msg.code).json({ status: messageType, message: msg.message, data: data });
      return false;
    } else {
      res.status(msg.code).json({ status: messageType, message: msg.message });
      return false;
    }
  }
};

/**
 * This function is use for to generate access token
 */
const generateJwt = function (req, res) {
  return (
    "Bearer~" +
    jwt.sign(
      {
        emailId: req.userDetails.emailId,
        exp: Date.now() + 24 * 60 * 60 * 1000
      },
      process.env.SECRETKEY
    )
  );
};

/**
 * This function is used for validate all requested fields
 **/
const validateParams = function (action, params, req, res) {
  if (_.isEmpty(params)) {
    module.exports.sendMsg("error", "requiredInfo", req, res);
    return false;
  }

  var permitted_data = [];
  var selectedData = {};
  // Generating list of information required.
  if (action in paramsValidator.params) {
    for (let i = 0; i < paramsValidator.params[action].fields.length; i++) {
      let keyName = paramsValidator.params[action].fields[i].name;
      // Validating list of information is avaliable in request or not
      if (!params.hasOwnProperty(keyName)) {
        module.exports.sendMsg("error", "requiredInfo", req, res);
        return false;
      }
      permitted_data.push(keyName);
    }
  }

  // Validating value pattern as per configure.
  for (let i = 0; i < permitted_data.length; i++) {
    if (permitted_data[i] in params) {
      req
        .check(permitted_data[i], "Validation Failed")
        .matches(
          eval(
            validationPattern.fields[
              paramsValidator.params[action].fields[i].type
            ].pattern
          )
        );
      var errors = req.validationErrors();
      if (errors) {
        module.exports.sendMsg("error", "patternEr", req, res);
        return false;
      } else {
        selectedData[permitted_data[i]] = params[permitted_data[i]];
      }
    }
  }

  return selectedData;
};

var responseHandler = function (res, responseObject, message, error, statusCode) {
  var date = new Date();

  res.status(statusCode).send({
    success: false,
    message: message,
    extendedMessage: responseObject,
    timeStamp: date.getTime()
  });
  res.end();
};


var jsUcfirst = function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = {
  getErrMsg,
  sendMsg,
  generateJwt,
  validateParams,
  responseHandler,
  jsUcfirst
};
