const router = require('express').Router();
const { isAuth } = require('../middlewares/auth');

const moviesController = require('../controllers/movies');

router.get('/', isAuth, moviesController.getMovies);

router.get('/search', isAuth, moviesController.searchByName);

router.get('/:provider/:id', isAuth, moviesController.getMovie);

module.exports = router;
