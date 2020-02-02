const Joi = require('@hapi/joi');

exports.createUserValidator = Joi.object().keys({
  username: Joi.string().required(),
  firstName: Joi.string()
    .min(3)
    .max(100)
    .required(),
  lastName: Joi.string()
    .min(3)
    .max(100)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(4)
    .max(100)
    .required()
});

exports.loginUserValidator = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string()
    .min(4)
    .max(100)
    .required()
});

exports.updateUserValidator = Joi.object().keys({
  fullName: Joi.string()
    .min(3)
    .max(100),
  username: Joi.string(),
  email: Joi.string().email()
});

exports.getUserByUsernameValidator = Joi.object().keys({
  username: Joi.string().required()
});

exports.verficationValidator = Joi.object().keys({
  token: Joi.string().required()
});
