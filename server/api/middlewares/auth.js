const passport = require('./passport');
const User = require('../models/user');

exports.isAuth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, async (err, user) => {
    if (!err && user) {
      user = await User.findOne({ _id: user._id });
    }

    if (err || !user) {
      return res.status(401).json({ message: 'Unautorized' });
    }

    req.user = user;
    next();
  })(req, res, next);
};
