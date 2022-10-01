// Posts, likes, comments
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const InviteSchema = new Schema({
  
  hwid: {
    type: String
  },
  createdAt: { 
      type: Date, expires: '1m', default: Date.now 
  }

});

module.exports = Invite = mongoose.model('invite', InviteSchema);
