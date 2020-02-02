const { Movies, PROVIDERS } = require('../helpers/torrent-apis');

const movies = new Movies({
  providers: [PROVIDERS.POPCORN]
});

exports.searchByName = async (req, res, next) => {
  try {
    const movies = await movies.searchByName(req.query.name);
    res.status(200).send(movies);
  } catch (err) {
    next(err);
  }
};

exports.getMovie = async (req, res, next) => {
  console.log(PROVIDERS[req.params.provider]);
  try {
    const movie = await movies.getMovie(req.params.id, 0);
    res.status(200).send(movie);
  } catch (err) {
    next(err);
  }
};

exports.getMovies = async (req, res, next) => {
  try {
    const result = await movies.getMovies(req.query);
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};
