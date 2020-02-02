const { Schema, model } = require("mongoose");

const movieSchema = new Schema({
  createdAt: { type: Date, default: Date.now }
});

module.exports.Cache = model("Cache", movieSchema);
