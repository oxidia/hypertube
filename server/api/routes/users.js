const router = require('express').Router();
const { isAuth } = require('../middlewares/auth');

const usersController = require('../controllers/users');
const userValidator = require('../middlewares/user');

router.post('/', userValidator.createValidator, usersController.create);

router.post(
  '/login',
  userValidator.loginValidator,
  usersController.login,
  usersController.authToken
);

router.get('/me', isAuth, usersController.me);

router.patch(
  '/',
  isAuth,
  userValidator.updateValidator,
  usersController.update
);

router.get(
  '/:username',
  userValidator.getUserByUsername,
  usersController.getUserByUsername
);

router.get(
  '/verification/:token',
  userValidator.verify,
  usersController.verify
);

router.get('/auth/google', usersController.google);

router.get(
  '/auth/google/callback',
  usersController.googleCallback,
  usersController.authToken
);

router.get('/auth/42', usersController.fortyTwo);

router.get(
  '/auth/42/callback',
  usersController.fortyTwoCallback,
  usersController.authToken
);

router.get('/auth/facebook', usersController.facebook);

router.get(
  '/auth/facebook/callback',
  usersController.facebookCallback,
  usersController.authToken
);

module.exports = router;
