const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  user_role:{
    type: String,
    default: "normal"
  },
  ban_status:{
    type:String,
    default: "normal"
  },
  hwid:{
    type: String,
    default: "empty48bf19dd-190d-4c3f-8779"
  },
  hwid_status:{
    type: String,
    default:"default"
  },
  beta:{
    type: String,
    default: "false"
  },
  ip:{
    type: String,
    default:"dynamic"
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('user', UserSchema);
