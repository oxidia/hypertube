const { Schema, model } = require('mongoose');

const movieSchema = new Schema({
  imdbId: { type: String, unique: true, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports.Movie = model('Movie', movieSchema);
