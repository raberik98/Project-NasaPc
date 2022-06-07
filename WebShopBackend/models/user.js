const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  admin: Boolean,
  courier: Boolean,
  session: String,
  activatorToken: String,
  passwordToken: String,
  wishList: [
    {
        type: Object
    }
]

}, { versionKey: false });

module.exports = mongoose.model('User', userSchema, 'users');