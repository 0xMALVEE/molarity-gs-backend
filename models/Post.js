// Posts, likes, comments
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
  user:{
    type:Schema.Types.ObjectId,
    ref:"user"
  },
  post: {
    type: String,
    required: true
  },
  likes: [
    {
      user:{
        type:Schema.Types.ObjectId,
        ref:"user"
      }
    }
  ],
  comments: [{
    user:{
      type:Schema.Types.ObjectId,
      ref:"user"
    },
    text:{
      type:String,
      required:true
    },
    name:{
      type:String,
      required:true
    },
    comment_created:{
      type:Date,
      default:Date.now
    }
  }],
  post_created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Posts = mongoose.model('posts', PostSchema);
