const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const date = require("date-and-time");
var upload = require("../../server").upload;

// Post Model
const Auction = require('../../models/Auction');
const User = require("../../models/User");

// Get All Auctions
//@GET - /api/auction
router.get("/", auth ,function(req,res){
  Auction.find()
    .then(item =>{
    res.json(item);
  })
});

//Get Specific Auction
//@GET - /api/auction/:id
router.get("/:id",auth,function(req,res){
  Auction.findById(req.params.id,function(err,data){
    if(data) res.json(data);
  })
});

const now = new Date();
const newDate = date.format(now, 'YYYY-MM-DD-HH');

//Add Auction
//@POST - /api/auction
router.post('/', auth, upload.none(),  function(req, res) {

  // res.json(req.body);

    // Create/Add Auctoin here to the DB
    const newAuction = new Auction({
      name:req.body.name,
      images:[{
        first_image:req.body.auction_item_image[0],
        second_image:req.body.auction_item_image[1],
        third_image:req.body.auction_item_image[2]
      }],
        description:req.body.description,
        category:req.body.category
    });
    newAuction.save().then(auction=> res.json(auction));
})

// Bid on Auction
//@POST - /api/auction/bid
router.post("/bid",auth, express.json(), function(req,res){
  var canbid = false;
  // res.json(req.body);
  Auction.findById(req.body.auction_id, function(err,data){
    if(!err){

      if(data.bids[0] == undefined){
        User.findById(req.user.id,function(err,userData){
          if(userData){

            data.bids.push({
              user_id:req.user.id,
              user_name:userData.name,
              user_email:userData.email,
              bid_price:req.body.bid_price,
              bid_proposal:req.body.bid_proposal
            });
            data.save().then(newData=> res.json(newData));


          }else{
            res.json(err);
          }
        })
      }else{

        var bid_state = false;

        data.bids.map(bid=>{
          if(bid.user_id != req.user.id){
            bid_state = true;
          } else{
            bid_state = false;
          }
        });

        console.log(bid_state);
        if(bid_state){
          User.findById(req.user.id,function(err,userData){
            if(userData){

              data.bids.push({
                user_id:req.user.id,
                user_name:userData.name,
                user_email:userData.email,
                bid_price:req.body.bid_price,
                bid_proposal:req.body.bid_proposal
              });
              data.save().then(newData=> res.json(newData));


            }else{
              res.json(err);
            }
          })
        }else{
          res.json("Can't bid more then once")
        }


      }

      // if(canbid == false){
      //   res.json({error:"You have allready bid on this.."})
      // }else{
      //     //Get user name then push

      //
      //
      // }

    }else{
      res.json(err);
    }
  })
});


// //Add Posts
// router.post("/", auth , function(req,res){
//   console.log(req.body.post);
//   const newPost = new Post({
//     user:req.user.id,
//     post:req.body.post,
//   });
//   newPost.save().then(posts => res.json(posts));
// })


// // Delete Post
// router.delete('/:id', auth, (req, res) => {
//   Post.findById(req.params.id)
//     .then(post => post.user == req.user.id ? post.remove().then(post=>res.json(post)) : res.json({error:"You are not the uesr"}))
//     .catch(err => res.json({error:"No Post Found"}))
// });

// //Add Like
// router.post("/like/:postid",auth,function(req,res){
//   Post.findById(req.params.postid).then(post =>{

//     if(post.likes.filter(like => like.user.toString() == req.user.id).length > 0){
//       return res.status(400).json({error:"LIKED"});
//     }else{
//       post.likes.unshift({user:req.user.id});
//       post.save().then(post => res.json(post))
//     }
//   })
// });

// //Remove Like // Not Done
// router.delete("/unlike/:postid",auth,function(req,res){
//   Post.findById(req.params.postid).then(post =>{

//     if(post.likes.filter(like => like.user.toString() == req.user.id).length > 0){
//       const newLikes = post.likes.filter(like => like.user.toString() != req.user.id);
//       post.likes = newLikes;

//       post.save().then(post => res.json(post))
//     }else{
//       post.likes.unshift({user:req.user.id});
//       post.save().then(post => res.json(post))
//     }

//   })
// });

// //Add comments
// router.post("/comment/:postid",auth,function(req,res){
//   Post.findById(req.params.postid).then(post =>{
//    const newComment = {
//      text:req.body.text,
//      name:req.body.name,
//      user:req.user.id
//    }

//    post.comments.unshift(newComment);
//    post.save().then(post => res.json(post))
//    .catch(err => res.status(404).json({error:"Post not found"}))

//   })
// });

// //Delete Comment
// router.delete("/comment/:postid/:commentid", auth, function(req,res){
//   Post.findById(req.params.postid).then(post =>{
//     post.comments.map(comment=>{
//       if(comment.user.toString() == req.user.id){
//         console.log("Matched")
//         if(comment.id == req.params.commentid){
//           const newCommentArr = post.comments.filter(comm=> comm.id != req.params.commentid);
//           post.comments = newCommentArr;
//           post.save().then(post => res.json(post))
//         }
//       }
//     })
//    })
// })

module.exports = router;
