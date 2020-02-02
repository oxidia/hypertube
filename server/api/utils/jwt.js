const jwt = require('jsonwebtoken');

exports.generateToken = payload => {
  return jwt.sign(payload, process.env.JWT_KEY);
};

exports.verfiyToken = async token => {
  return jwt.verify(token, process.env.JWT_KEY);
};
