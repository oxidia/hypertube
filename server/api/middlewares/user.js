const userSchema = require('../validators/user');
const utils = require('../utils');

exports.createValidator = (req, res, next) => {
  const { error } = userSchema.createUserValidator.validate(req.body);

  if (!error) return next();

  res.status(400).send({ error: utils.prettyError(error) });
};

exports.loginValidator = (req, res, next) => {
  const { error } = userSchema.loginUserValidator.validate(req.body);

  if (!error) return next();

  res.status(400).send({ error: utils.prettyError(error) });
};

exports.updateValidator = (req, res, next) => {
  const { error } = userSchema.updateUserValidator.validate(req.body);

  if (!error) return next();

  res.status(400).send({ error: utils.prettyError(error) });
};

exports.getUserByUsername = (req, res, next) => {
  const { error } = userSchema.getUserByUsernameValidator.validate(req.params);

  if (!error) return next();

  res.status(400).send({ error: utils.prettyError(error) });
};

exports.verify = async (req, res, next) => {
  const { error } = userSchema.verficationValidator.validate(req.params);

  if (!error) {
    try {
      const decoded = await utils.verfiyToken(req.params.token);

      if (!decoded.is_verification) throw new Error();

      req.user = decoded;
      return next();
    } catch (err) {
      return res.status(400).send({ message: 'invalid token' });
    }
  }

  res.status(400).send({ error: utils.prettyError(error) });
};
