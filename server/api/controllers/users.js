const utils = require('../utils');

const User = require('../models/user');

const passport = require('../middlewares/passport');

exports.create = async (req, res, next) => {
  const user = new User(req.body);

  try {
    const usernameExists = await User.usernameExists(req.body.username);

    if (usernameExists) {
      return res.status(403).send({ error: { username: 'already exists' } });
    }

    const emailExists = await User.emailExists(req.body.email);

    if (emailExists) {
      return res.status(403).send({ error: { email: 'already exists' } });
    }

    const newUser = await user.save();

    res.status(201).send({
      message: 'User created',
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.login = (req, res, next) => {
  passport.authenticate('login', (err, user, info) => {
    if (err) return next(err);

    if (info) return res.status(401).send(info);

    const payload = { _id: user._id };
    const token = utils.generateToken(payload);

    req.user = token;
    next();
  })(req, res, next);
};

exports.me = (req, res, next) => {
  try {
    res.status(200).send(req.user);
  } catch (err) {
    next(err);
  }
};

exports.getUserByUsername = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.params.username })
      .select('-_id')
      .select('firstName')
      .select('lastName');

    if (!user) {
      return res.status(404).send({ message: 'resource not found' });
    }
    res.status(200).send({ exists: true });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    if (req.body.username) {
      const usernameExists = await User.usernameExists(req.body.username);

      if (usernameExists) {
        return res.status(403).send({ message: 'username is already exists' });
      }
    }

    if (req.body.email) {
      const emailExists = await User.emailExists(req.body.email);

      if (emailExists) {
        return res.status(403).send({ message: 'email is already exists' });
      }
    }

    let user = await User.findOne({ _id: req.user._id });

    // Check email is updated
    if (req.body.email && req.body.email !== user.email) {
      user.emailActivated = false;
    }

    // Update user object with given values
    for (const key in req.body) {
      const value = req.body[key];

      user[key] = value;
    }

    user = await user.save();

    res.status(200).send({ message: 'User updated', user });
  } catch (err) {
    next(err);
  }
};

exports.verify = async (req, res, next) => {
  try {
    await User.updateOne(
      { _id: req.user.id },
      {
        $set: { verfied: true }
      }
    );
    res.status(200).send({ message: 'user verified' });
  } catch (err) {
    next(err);
  }
};

exports.google = passport.authenticate('google', {
  scope: ['profile', 'email']
});

exports.googleCallback = passport.authenticate('google', { session: false });

exports.fortyTwo = passport.authenticate('42');

exports.fortyTwoCallback = passport.authenticate('42', {
  session: false
});

exports.facebook = passport.authenticate('facebook', {
  scope: ['email']
});

exports.facebookCallback = passport.authenticate('facebook', {
  session: false
});

exports.authToken = (req, res) => {
  res.status(200).send({ token: req.user });
};
