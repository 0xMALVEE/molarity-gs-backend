const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const fs = require('fs')
// Item Model
const Item = require('../../models/Item');
const Invite = require('../../models/Invite');
const path = require('path');
const User = require("../../models/User");
const { v4: uuidv4 } = require('uuid');

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.post('/', auth, (req, res) => {
    User.findById(req.user.id, function(err,data){
        if(err){
            res.json({error:"fail"})
        }else{
            if (data.user_role == "admin"){
                const newInvite = new Invite({
                    invite_code: uuidv4()
                });
                newInvite.save().then(invite_=> res.json({success: "success"}));
            }
        }
    })
     
  
});

router.get('/', auth, (req, res) => {
    User.findById(req.user.id, function(err,data){
        if(err){
            res.json({error:"fail"})
        }else{
            if (data.user_role == "admin"){
                Invite.find()
                .sort( [['_id', -1]] )
                .then(data =>{
                    res.json({invites:data})
                    // console.log(data)
                })
            }
        }
    })
});


module.exports = router;
