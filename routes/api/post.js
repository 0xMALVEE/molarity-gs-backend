const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');


// Post Model
const Post = require('../../models/Post');


// Get Posts
router.get("/",auth,function(req,res){
  Post.find({
    user:req.user.id
  }).then(post =>{
    res.json(post);
  })
});


//Add Posts
router.post("/", auth , function(req,res){
  console.log(req.body.post);
  const newPost = new Post({
    user:req.user.id,
    post:req.body.post,
  }); 
  newPost.save().then(posts => res.json(posts));
})


// Delete Post
router.delete('/:id', auth, (req, res) => {
  Post.findById(req.params.id)
    .then(post => post.user == req.user.id ? post.remove().then(post=>res.json(post)) : res.json({error:"You are not the uesr"}))
    .catch(err => res.json({error:"No Post Found"}))
});

//Add Like
router.post("/like/:postid",auth,function(req,res){
  Post.findById(req.params.postid).then(post =>{

    if(post.likes.filter(like => like.user.toString() == req.user.id).length > 0){
      return res.status(400).json({error:"LIKED"});
    }else{
      post.likes.unshift({user:req.user.id});
      post.save().then(post => res.json(post))
    }
  })
});

//Remove Like // Not Done
router.delete("/unlike/:postid",auth,function(req,res){
  Post.findById(req.params.postid).then(post =>{

    if(post.likes.filter(like => like.user.toString() == req.user.id).length > 0){
      const newLikes = post.likes.filter(like => like.user.toString() != req.user.id);
      post.likes = newLikes;

      post.save().then(post => res.json(post))
    }else{
      post.likes.unshift({user:req.user.id});
      post.save().then(post => res.json(post))
    }

  })
});

//Add comments
router.post("/comment/:postid",auth,function(req,res){
  Post.findById(req.params.postid).then(post =>{
   const newComment = {
     text:req.body.text,
     name:req.body.name,
     user:req.user.id
   }

   post.comments.unshift(newComment);
   post.save().then(post => res.json(post))
   .catch(err => res.status(404).json({error:"Post not found"}))

  })
});

//Delete Comment
router.delete("/comment/:postid/:commentid", auth, function(req,res){
  Post.findById(req.params.postid).then(post =>{
    post.comments.map(comment=>{
      if(comment.user.toString() == req.user.id){
        console.log("Matched")
        if(comment.id == req.params.commentid){
          const newCommentArr = post.comments.filter(comm=> comm.id != req.params.commentid);
          post.comments = newCommentArr;
          post.save().then(post => res.json(post))
        }
      }
    }) 
   })
})

module.exports = router;