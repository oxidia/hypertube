const { Schema, model } = require('mongoose');

const watchSchema = new Schema({
  id: { type: Schema.Types.ObjectId, required: true, ref: 'Movie' },
  seenAt: { type: Date, default: Date.now }
});

module.exports.watchListSchema = model('Watch', watchSchema);
