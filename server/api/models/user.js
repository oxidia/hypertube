const { Schema, model } = require('mongoose');
const utils = require('../utils');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  username: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  emailVerified: { type: Boolean, default: false },
  password: { type: String, select: false },
  google: { id: String },
  facebook: { id: String },
  '42': { id: String },
  avatar: { type: String },
  watchList: [{ type: Schema.Types.ObjectId, ref: 'Watch' }],
  createdAt: { type: Date, default: Date.now }
});

userSchema.pre('save', function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  // Hash the password using our new salt
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) return next(err);

    // Override the cleartext password with the hashed one
    this.password = hash;
    next();
  });
});

userSchema.statics.idExists = async _id => {
  const user = await model('User').findOne({ _id });

  return !!user;
};

userSchema.statics.usernameExists = async username => {
  const user = await model('User').findOne({ username });

  return !!user;
};

userSchema.statics.emailExists = async email => {
  const user = await model('User').findOne({ email });

  return !!user;
};

userSchema.methods.isValidPassword = async function(password) {
  const compare = await bcrypt.compare(password, this.password);

  return compare;
};

userSchema.methods.googleAuth = async function() {
  const User = model('User');

  let user = await User.findOne({ 'google.id': this.google.id });

  if (!user) {
    user = await User.findOne({ email: this.email });
  }

  if (!user) user = await this.save();
  else {
    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          google: { id: this.google.id },
          emailVerified: true
        }
      }
    );
  }

  const payload = { _id: user._id };
  return utils.generateToken(payload);
};

userSchema.methods.fortyTwoAuth = async function() {
  const User = model('User');

  let user = await User.findOne({ '42.id': this['42'].id });

  if (!user) {
    const emailExists = await User.emailExists(this.email);

    if (emailExists) {
      return { error: { email: 'already exists' } };
    }
  }

  if (!user) user = await this.save();

  const payload = { _id: user._id };
  return utils.generateToken(payload);
};

userSchema.methods.facebookAuth = async function() {
  const User = model('User');

  let user = await User.findOne({ 'facebook.id': this.facebook.id });

  if (!user) {
    const emailExists = await User.emailExists(this.email);

    if (emailExists) {
      return { error: { email: 'already exists' } };
    }
  }

  if (!user) user = await this.save();

  const payload = { _id: user._id };
  return utils.generateToken(payload);
};

module.exports = model('User', userSchema);
