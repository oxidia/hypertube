const { Schema, model } = require('mongoose');

const emailVerificationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, unique: true, required: true },
  token: { type: String, unique: true, required: true },
  createdAt: { type: Date, default: Date.now }
});

emailVerificationSchema.pre('save', async function(next) {
  await emailVerificationSchema.deleteOne({ user: this.user });

  await this.save();

  next();
});

module.exports.Cache = model('EmailVerification', movieSchema);
