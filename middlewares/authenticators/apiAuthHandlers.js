var jwt = require('jsonwebtoken');
<<<<<<< HEAD
var globalService = require('../../service/globalService');

const apiValidateToken = function (req, res, next) {
  let accessToken = req.body.token || req.headers['x-access-token'];
  if (accessToken) {
    const token = accessToken.split('~')[1];
=======
var globalService = require('../../services/globalService');

const apiValidateToken = function (req, res, next) {
  let accessToken = req.body.token || req.headers['access-token'];
  if (accessToken) {
    const token = accessToken;
>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
    req.currentUser = {};

    jwt.verify(token, process.env.SECRETKEY, function (err, decoded) {
      if (decoded) {
        req.currentUser.emailId = decoded.emailId;
        next();
      } else {
        globalService.sendMsg('error', 'tokenNF', req, res);
        return false;
      }
    });
  } else {
    globalService.sendMsg('error', 'tokenNA', req, res);
    return false;
  }
};

<<<<<<< HEAD
=======

const validToken = function (req, res, next) {
  const authorizationHeaader = req.headers.authorization;
  let result;
  if (authorizationHeaader) {
    const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
    const options = {
      expiresIn: '2d',
      issuer: 'rumble'
    };
    try {
      console.log("token",token)
      // verify makes sure that the token hasn't expired and has been issued by us
      result = jwt.verify(token, process.env.SECRETKEY, options);

      // Let's pass back the decoded token to the request object
      req.decoded = result;
      // We call next to pass execution to the subsequent middleware
      next();
    } catch (err) {
      // Throw an error just in case anything goes wrong with verification
      throw new Error(err);
      
    }
  } else {
    result = {
      error: `Authentication error. Token required.`,
      status: 401
    };
    res.status(401).send(result);
  }
}

>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
const apiVerifyUser = function (req, res, next) {
  if (req.user.status === CONFIGS.userStatus.inactive) {
    return res.json({ responseCode: 203, msg: 'User not verified' });
  } else if (req.user.status === CONFIGS.userStatus.suspended) {
    return res.json({ responseCode: 203, msg: 'User not verified' });
  } else if (req.user.status === CONFIGS.userStatus.reported) {
    return res.json({ responseCode: 203, msg: 'User not verified' });
  } else if (req.user.status === CONFIGS.userStatus.blocked) {
    return res.json({ responseCode: 203, msg: 'User not verified' });
  } else {
    next();
  }
};

const apiIsDriver = function (req, res, next) {
  if (req.user.status !== CONFIGS.role.driver) {
    return res.json({ responseCode: 203, msg: 'User not verified' });
  } else {
    next();
  }
};

const apiIsCustomer = function (req, res, next) {
  if (req.user.status !== CONFIGS.role.customer) {
    return res.json({ responseCode: 203, msg: 'User not verified' });
  } else {
    next();
  }
};

module.exports = {
  apiValidateToken,
<<<<<<< HEAD
=======
  validToken,
>>>>>>> 1d9e114f08b8bfd1b214ffcb0fa0fbef07bf05e1
  apiVerifyUser,
  apiIsDriver,
  apiIsCustomer
}