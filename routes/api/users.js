const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// User Model
const User = require('../../models/User');
const Invite = require('../../models/Invite');
// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post('/',express.json(), (req, res) => {
  const { name, email, password , invitation} = req.body;

  // Simple validation
  if(!name || !email || !password || !invitation) {
    console.log(name, email, password, invitation)
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  Invite.findOne({invite_code:invitation})
  .then(data =>{
    if (data != null){
      // Delete Current Invite
      data.remove()
      .then(new_data => {
        // Create user
        User.findOne({ email })
        .then(user => {

          
          if(user) return res.status(400).json({ msg: 'User already exists' });
          User.findOne({ name })
          .then(user_ =>{
            if(user_) return res.status(400).json({ msg: 'Username already exists' });  

            const newUser = new User({
              name,
              email,
              password,
              ip:  "dynamic"
            });
  
            // Create salt & hash
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save()
                  .then(user => {
                    jwt.sign(
                      { id: user.id },
                      config.get('jwtSecret'),
                      { expiresIn: 3600 },
                      (err, token) => {
                        if(err) throw err;
                        res.json({
                          token,
                          user: {
                            id: user.id,
                            name: user.name,
                            email: user.email
                          }
                        });
                      }
                    )
                  });
              })
            })

          })

          


        })


      })
      
      

      
    }else{
      res.status(400).json({ msg: 'Wrong Invitation Code' })
    }
  })

  // Check for existing user
 
});

router.get("/",auth, (req,res)=>{


  User.findById(req.user.id, function(err,data){
    if(err){
        res.json({error:"fail"})
    }else{
        if (data.user_role == "admin"){
         
          User.find({}, function(err, users) {
            var userMap = [];
        
            users.forEach(function(user) {
              userMap.push(user) ;
            });
        
            res.send(userMap);  
          });
          
        }
        }
    })



 
})

router.post("/ban", auth,(req,res)=>{
  
  User.findById(req.user.id, function(err,data){
    if(err){
        res.json({error:"fail"})
    }else{
        if (data.user_role == "admin"){
          let username = req.body.username
          User.findOneAndUpdate({name:username}, { user_role:"banned" })
          .then(data =>{
           res.send("UPDATED_HWID")
          })
          
        }
        }
    })
  
  
})

router.post("/unban", auth,(req,res)=>{
  
  User.findById(req.user.id, function(err,data){
    if(err){
        res.json({error:"fail"})
    }else{
        if (data.user_role == "admin"){
          let username = req.body.username
          User.findOneAndUpdate({name:username}, { user_role:"normal" })
          .then(data =>{
           res.send("UPDATED_HWID")
          })
          
        }
        }
    })
  
  
})

module.exports = router;
