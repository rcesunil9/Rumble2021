const Joi = require('@hapi/joi');

const Driver = {
  addBody: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    countryCode: Joi.string().required(),
    mobile: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    gender: Joi.string().required(),
    profile: Joi.string().allow('').optional(),
    acceptTNC: Joi.string().required(),
  }),
  updateBody: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    countryCode: Joi.string().required(),
    mobile: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    gender: Joi.string().required(),
    profile: Joi.string().allow('').optional()
  })
};

module.exports = {
  Driver
};
