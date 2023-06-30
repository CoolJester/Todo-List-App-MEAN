const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    default: 'Noti User'
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'Please enter a email']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
