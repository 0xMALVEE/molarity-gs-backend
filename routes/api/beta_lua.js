const express = require('express');
const router = express.Router();
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const fs = require('fs')
// Item Model
const bcrypt = require('bcryptjs');
const Item = require('../../models/Item');
const User = require('../../models/User');
const UploadModel = require('../../models/Upload');
const path = require('path');
// @route   GET api/items
// @desc    Get All Items
// @access  Public
// router.get('/',  (req, res) => {
//     UploadModel.findOne()
//     .sort( [['_id', -1]] ).limit(1)
//     .then(item => {

//       fs.readFile(path.join(__dirname, `/../../public/${item.upload_string}.txt`), 'utf8' , (err, data) => {
//         if (err) {
//           console.error(err)
//           return
//         }
//         res.send(data)
//       })
//     });
// });

// Query params username, password, hwid (From Print)
//Check IP .. hwid all
router.get('/', (req, res) => {
  const { name, password, hwid } = req.query;
  const ip_ = req.clientIp
  // Simple validation
  if(!name || !password || !hwid) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Check for existing user
  User.findOne({ name })
    .then(user => {
      if(!user) return res.status(400).json({ msg: 'User Does not exist' });

      // Validate password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

          jwt.sign(
            { id: user.id },
            config.get('jwtSecret'),
            { expiresIn: 3600 },
            (err, token) => {
              if(err) throw err;
              
              // console.log("Username from db",user.ip)
              // console.log("Local ip" ,ip_)
              // ip_ (CHECK IP)
              if(user.ip == ip_ || user.ip == "dynamic"){
                // Check HWID 
                if(user.hwid == hwid){
                  //user verified now send lua
                  if(user.beta == "beta"){
                    fs.readFile(path.join(__dirname, `/../../public/BETA.txt`), 'utf8' , (err, data) => {
                        if (err) {
                          console.error(err)
                          return
                        }
                        res.send(data)
                      })
                  }else{
                      res.send("beta error")
                  }
                

                }else{
                  res.send("wrong hwid")  
                }
                
              }else{
                res.send("wrong ip")
              }
              
            }
          )
        })
    })
});


router.get('/hwid',  (req, res) => {
  fs.readFile(path.join(__dirname, `/../../public/hwid.txt`), 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    res.send(data)
  })

});


module.exports = router;
