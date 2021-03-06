const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email   : { type: String, unique: true, dropDups: true },
  password: { type: String, required: true },
  username: { type: String, unique: true, dropDups: true },
  passwordResetToken  : String,
  passwordResetExpires: Date,
  role: String,

  facebook: String,
  google  : String,
  tokens  : Array,

  profile: {
    name   : String,
    gender : String,
    age    : Number,
    website: String,
    picture: String
  },

  friends: [{ type: Schema.Types.ObjectId, ref: 'users' }]
}, { timestamps: true });
// TODO: Re design schema

/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
        user.password = hash;
        next();
    });
  });
});

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = (candidatePassword, hash, cb) => {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    cb(err, isMatch);
  });
};

/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = (size) => {
  if (!size) {
    size = 200;
  }
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

const User = mongoose.model('users', userSchema);

module.exports = User;
