const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    default: 'Noti User'
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.Model('User', userSchema);
