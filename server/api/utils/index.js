const { generateToken, verfiyToken } = require('./jwt');
const { sendEmail } = require('./email');
const prettyError = require('./prettyerror');

module.exports = {
  generateToken,
  verfiyToken,
  sendEmail,
  prettyError
};
