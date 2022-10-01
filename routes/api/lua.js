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
const Store = require('../../models/Store');
const path = require('path');

const Discord = require("discord.js")
const ipInfo = require("ipinfo")
const webhook = new Discord.WebhookClient("940600017985617960","HVDNlTpSYm5HuZvHbXzZjNn946xt9Qu5FmQ2kvHk6GgC42UG0UmVhRVTsPh5lOb26l58")


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
// nGciOiJIUzI1NiIsInRhc2RmIjoiSmFkZ
// ppvaG4gRG9lIiwiaWF0IjoxNT
// h9gTlQsLSvBJrtzWGZr9qdSUeGsIccKY3cP7ndVIKQ
// Query params username, password, hwid (From Print)
//Check IP .. hwid all#0dff55
router.post('/', (req, res) => {

  ipInfo(req.clientIp, (err, cLoc5) => {
    if(cLoc5.status !== 404){
      
    const trying_to_login = new Discord.MessageEmbed()
    .setTitle('Trying to login![LUA]')
    .setColor('#cf2b0a')
    .addField('IP ADDRESS', `${req.clientIp}`)
    .addField('LOCATION', `${cLoc5.country}, ${cLoc5.region}, ${cLoc5.city}`)
    .addField('ISP', `${cLoc5.org}`)
    .addField('TimeZone', `${cLoc5.timezone}`)
    .addField('INFO', 'Request Came To Lua endpoint!')
    .setFooter('Mol?lurity.lua');

        webhook.send('', {
          username: 'Mol?lurity.lua',
          avatarURL: 'https://static.vecteezy.com/packs/media/components/global/search-explore-nav/img/vectors/term-bg-1-666de2d941529c25aa511dc18d727160.jpg',
          embeds: [trying_to_login],
        });

    }})

  if(req.headers.y3odkwiiwibmftzsi6i == "eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2Mjpkyhokaf"){
    const { ngcioijiuzi1niisinrhc2rmijoismfkz, ppvag4grg9liiwiawf0ijoxnt, h9gtlqslsvbjrtzwgzr9qdsuegsiccky3cp7ndvikq } = req.headers;
    var name = ngcioijiuzi1niisinrhc2rmijoismfkz
    var password = ppvag4grg9liiwiawf0ijoxnt
    var hwid = h9gtlqslsvbjrtzwgzr9qdsuegsiccky3cp7ndvikq
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
                  if(user.hwid == hwid && user.hwid_status == "set"){
                    if(user.user_role == "normal" || user.user_role == "admin"){

                       // new
                    Store.findById("61fe5b2e33c463384c3a45da", function (err, data) {
                      if (err){
                          console.log(err);
                      }
                      else{
                          // Buffer.from( Buffer.from(data.lua).toString('base64')).toString('base64')
                          let s = Buffer.from(data.lua).toString('base64')
                     
                          res.send( Buffer.from(s).toString('base64')  )
                          // Send logs after sending lua
                          ipInfo(req.clientIp, (err, cLoc5) => {
                            if(cLoc5.status !== 404){
                              
                            const sent_lua_done = new Discord.MessageEmbed()
                            .setTitle('Lua is sent successfully!')
                            .setColor('#0dff55')
                            .addField('IP ADDRESS', `${req.clientIp}`)
                            .addField('LOCATION', `${cLoc5.country}, ${cLoc5.region}, ${cLoc5.city}`)
                            .addField('ISP', `${cLoc5.org}`)
                            .addField('TimeZone', `${cLoc5.timezone}`)
                            .addField('INFO', 'Lua is sent to customer!')
                            .setFooter('Mol?lurity.lua');
                        
                                webhook.send('', {
                                  username: 'Mol?lurity.lua',
                                  avatarURL: 'https://static.vecteezy.com/packs/media/components/global/search-explore-nav/img/vectors/term-bg-1-666de2d941529c25aa511dc18d727160.jpg',
                                  embeds: [sent_lua_done],
                                });
                        
                            }})
                      }
                    });

                    }else{
                      // Banned user print msg
                      ipInfo(req.clientIp, (err, cLoc5) => {
                        if(cLoc5.status !== 404){
                          
                        const sent_lua_done = new Discord.MessageEmbed()
                        .setTitle('User is banned!')
                        .setColor('#000000')
                        .addField('IP ADDRESS', `${req.clientIp}`)
                        .addField('LOCATION', `${cLoc5.country}, ${cLoc5.region}, ${cLoc5.city}`)
                        .addField('ISP', `${cLoc5.org}`)
                        .addField('TimeZone', `${cLoc5.timezone}`)
                        .addField('INFO', 'Lua cant be sent!')
                        .setFooter('Mol?lurity.lua');
                    
                            webhook.send('', {
                              username: 'Mol?lurity.lua',
                              avatarURL: 'https://static.vecteezy.com/packs/media/components/global/search-explore-nav/img/vectors/term-bg-1-666de2d941529c25aa511dc18d727160.jpg',
                              embeds: [sent_lua_done],
                            });
                    
                        }})

                    }
                    //user verified now send lua
  
                    // fs.readFile(path.join(__dirname, `/../../public/LUA.txt`), 'utf8' , (err, data) => {
                    //   if (err) {
                    //     console.error(err)
                    //     return
                    //   }
                    //   res.send(data)
                    // })

                   
  
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
  }else{
    res.send("Pls don't try to hack you nn dog 1")
  }
  

});

router.get("/upload", (req,res)=>{
  // Store.findById("61fe5b2e33c463384c3a45da", function (err, data) {
  //   if (err){
  //       console.log(err);
  //   }
  //   else{
  //       res.send(Buffer.from(data.lua, 'base64').toString('ascii'));
  //   }
  // });
})

router.get('/hwid',  (req, res) => {
  // console.log(r)
  console.log(req.headers)
  if (req.headers.y3odkwiiwibmftzsi6i == "eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2Mjpkyhokaf"){
    fs.readFile(path.join(__dirname, `/../../public/hwid.txt`), 'utf8' , (err, data) => {
      if (err) {
        console.error(err)
        return
      }
      res.send(data)
    })
  }else{
    res.send("Pls don't try to hack you nn dog 1")
  }
 

});

router.post('/hwid',  (req, res) => {
  // console.log(r)
  console.log(req.headers)
  if (req.headers.y3odkwiiwibmftzsi6i == "eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2Mjpkyhokaf"){
   const {name,hwid} = req.headers;
   User.findOneAndUpdate({name,hwid_status:"default"}, { hwid,hwid_status:"set" })
   .then(data =>{
    res.send("UPDATED_HWID")
   })

  }else{
    res.send("Pls don't try to hack you nn dog 1")
  }
 

});

router.post("/test", (req,res)=>{
  // console.log(req.body.username)
  // console.log(req.body.password)
  
  if(req.headers.Y3ODkwIiwibmFtZSI6I == "eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2Mjpkyhokaf"){
    res.send(req.headers.username + " " + req.headers.password)
  }else{
    res.send("invalid token")
  }



})


module.exports = router;
