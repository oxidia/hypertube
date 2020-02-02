const { Schema, model } = require('mongoose');

const resetPasswordSchema = new Schema({
  user: { type: Schema.Types.ObjectId, unique: true, required: true },
  token: { type: String, unique: true, required: true },
  createdAt: { type: Date, default: Date.now }
});

resetPasswordSchema.pre('save', async function(next) {
  await resetPasswordSchema.deleteOne({ user: this.user });

  await this.save();

  next();
});

module.exports.Cache = model('ResetPassword', resetPasswordSchema);
