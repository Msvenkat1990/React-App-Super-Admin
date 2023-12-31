const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  role:{type: String},
  password: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
