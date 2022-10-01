// Posts, likes, comments
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const AuctionSchema = new Schema({
  user:{
    type:Schema.Types.ObjectId,
    ref:"user"
  },
  name: {
    type: String,
    required: true
  },
  // Auction Item Image Links
  images:[{
    first_image:{
      type:String,
      required:true
    },
    second_image:{
      type:String,
      required:true
    },
    third_image:{
      type:String,
      require:true
    }
  }],
  description:{
    type:String,
    required:true
  },
  category:{
    type:String,
    required:true
  },
  bids:[{
      user_id:{
        type:Schema.Types.ObjectId,
        ref:"user"
      },
      user_name:{
        type:String
      },
      user_email:{
        type:String
      },
      bid_price:{
        type:String
      },
      bid_proposal:{
        type:String
      }
  }]
  ,
  aunction_created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Auctions = mongoose.model('auction', AuctionSchema);
