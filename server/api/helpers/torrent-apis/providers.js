const axios = require('axios');

class TV {
  constructor() {
    this.baseUrl = 'https://tv-v2.api-fetch.website';
  }

  _prepareMovie(movie) {
    return {
      source: {
        id: movie._id,
        provider: 'TV'
      },
      title: movie.title,
      description: movie.synopsis,
      rating: { loved: movie.rating.percentage },
      runtime: movie.runtime,
      year: movie.year,
      genres: movie.genres,
      poster: movie.images.poster,
      torrents: Object.keys(movie.torrents.en).map(key => {
        const torrent = movie.torrents.en[key];
        torrent.quality = key;

        return {
          torrentMagnet: torrent.url,
          quality: torrent.quality,
          seeds: torrent.seed,
          peers: torrent.peer
        };
      })
    };
  }

  _prepareData(data) {
    const movies = Array.isArray(data) ? data : [data];

    return movies.map(movie => this._prepareMovie(movie));
  }

  _sendRequest(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.baseUrl}${url}`, { params })
        .then(({ data }) => {
          const movies = this._prepareData(data);

          resolve(movies);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  getMovies(options) {
    return this._sendRequest(`/movies/${options.page}`, options);
  }

  getMovie(movieId) {
    return this._sendRequest(`/movie/${movieId}`);
  }

  searchByName(name, options = {}) {
    options.keywords = name;

    return this._sendRequest(`/movies/${options.page}`, options);
  }
}

class PopCorn {
  constructor() {
    this.baseUrl = 'https://api.apiumadomain.com';
  }

  _prepareMovie(movie) {
    return {
      source: {
        id: movie.imdb,
        provider: 'POPCORN'
      },
      title: movie.title,
      description: movie.description,
      rating: { imdb: movie.rating },
      runtime: movie.runtime,
      year: movie.year,
      genres: movie.genres,
      poster: movie.poster_big,
      torrents: movie.items.map(item => ({
        torrentLink: item.torrent_url,
        torrentMagnet: item.torrent_magnet,
        quality: item.quality,
        seeds: item.torrent_seeds,
        peers: item.torrent_peers
      }))
    };
  }

  _prepareData(data) {
    data = data.MovieList ? data : { MovieList: [ data ] }

    return data.MovieList.map(movie => this._prepareMovie(movie));
  }

  _sendRequest(route, params) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.baseUrl}${route}`, { params })
        .then(({ data }) => {
          const movies = this._prepareData(data);

          resolve(movies);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  getMovies(options) {
    options.sort = 'seeds';

    return this._sendRequest('/list', options);
  }

  getMovie(imdbId) {
    const options = {
      imdb: imdbId
    };

    return this._sendRequest('/movie', options);
  }

  searchByName(name, options) {
    options.quality = '720p,1080p,3d';
    options.sort = 'seeds';
    options.keywords = name;

    return this._sendRequest(options);
  }
}

exports.TV = TV;
exports.PopCorn = PopCorn;
