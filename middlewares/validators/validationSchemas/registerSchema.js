const Joi = require('@hapi/joi');

const Register = {
  body: Joi.object({
    fullname: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    phone: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    rpassword: Joi.ref('password'),
    acceptTNC: Joi.string().required(),
  })
};

module.exports = {
  Register
};
