const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const upload = require('multer')();

const Discord = require("discord.js")
const ipInfo = require("ipinfo")

const webhook = new Discord.WebhookClient("940600017985617960","HVDNlTpSYm5HuZvHbXzZjNn946xt9Qu5FmQ2kvHk6GgC42UG0UmVhRVTsPh5lOb26l58")




// User Model
const User = require('../../models/User');


router.post('/', (req, res) => {

    // Tried to login

    ipInfo(req.clientIp, (err, cLoc5) => {
      if(cLoc5.status !== 404){
        
      const trying_to_login = new Discord.MessageEmbed()
      .setTitle('Trying to login![Auth]')
      .setColor('#fc5603')
      .addField('IP ADDRESS', `${req.clientIp}`)
      .addField('LOCATION', `${cLoc5.country}, ${cLoc5.region}, ${cLoc5.city}`)
      .addField('ISP', `${cLoc5.org}`)
      .addField('TimeZone', `${cLoc5.timezone}`)
      .addField('INFO', 'Request Came to Auth Endpoint!')
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
              if(!isMatch){
                ipInfo(ip_, (err, cLoc5) => {
                  if(cLoc5.status !== 404){
                     
                  const embed_unsuccessfull_user_pass = new Discord.MessageEmbed()
                  .setTitle('Unsuccessful login')
                  .setColor('#ff0000')
                  .addField('USERNAME', `${user.name}`)
                  .addField('IP ADDRESS', `${ip_}`)
                  .addField('LOCATION', `${cLoc5.country}, ${cLoc5.region}`)
                  .addField('HWID', `${hwid}`)
                  .addField('CAUSE', 'WRONG USERNAME/PASSWORD')
                  .setFooter('Mol?lurity.lua');
  
                      webhook.send('', {
                        username: 'Mol?lurity.lua',
                        avatarURL: 'https://static.vecteezy.com/packs/media/components/global/search-explore-nav/img/vectors/term-bg-1-666de2d941529c25aa511dc18d727160.jpg',
                        embeds: [embed_unsuccessfull_user_pass],
                      });
  
                  }})
              }
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
                      // Get information about a known ip
                      ipInfo(ip_, (err, cLoc) => {
                          
                        if(cLoc.status !== 404){
                            console.log(cLoc)
                            // Success Login EMBED
  
                            const embed_success = new Discord.MessageEmbed()
                            .setTitle('Successful Login')
                            .setColor('#00c91e')
                            .addField('USERNAME', `${user.name}`)
                            .addField('IP ADDRESS', `${ip_}`)
                            .addField('LOCATION', `${cLoc.country}, ${cLoc.region}`)
                            .addField('HWID', `${hwid}`)
                            .setFooter('Mol?lurity.lua');
  
                            webhook.send('', {
                              username: 'Mol?lurity.lua',
                              avatarURL: 'https://static.vecteezy.com/packs/media/components/global/search-explore-nav/img/vectors/term-bg-1-666de2d941529c25aa511dc18d727160.jpg',
                              embeds: [embed_success],
                            });
                            
                        }else{
                            console.log("Invalid  IP")
                        }
                      })
  
                      res.send("done")
                    }else{
                      ipInfo(ip_, (err, cLoc2) => {
                      if(cLoc2.status !== 404){
                          // Wrong HWID 
                          const wrong_hwid = new Discord.MessageEmbed()
                          .setTitle('Wrong HWID')
                          .setColor('#1e00c9')
                          .addField('USERNAME', `${user.name}`)
                          .addField('IP ADDRESS', `${ip_}`)
                          .addField('LOCATION', `${cLoc2.country}, ${cLoc2.region}`)
                          .addField('HWID', `${hwid}`)
                          .setFooter('Mol?lurity.lua');
  
                          webhook.send('', {
                            username: 'Mol?lurity.lua',
                            avatarURL: 'https://static.vecteezy.com/packs/media/components/global/search-explore-nav/img/vectors/term-bg-1-666de2d941529c25aa511dc18d727160.jpg',
                            embeds: [wrong_hwid],
                          });
  
                      }})
                     
                      
                      res.send("wrong hwid")  
                    }
                    
                  }else{
  
                    ipInfo(ip_, (err, cLoc3) => {
                      if(cLoc3.status !== 404){
                        // Wrong HWID 
                        const different_ip = new Discord.MessageEmbed()
                        .setTitle('Different IP')
                        .setColor('#c95000')
                        .addField('USERNAME', `${user.name}`)
                        .addField('IP ADDRESS', `${ip_}`)
                        .addField('LOCATION', `${cLoc3.country}, ${cLoc3.region}`)
                        .addField('HWID', `${hwid}`)
                        .setFooter('Mol?lurity.lua');
                        
                        webhook.send('', {
                          username: 'Mol?lurity.lua',
                          avatarURL: 'https://static.vecteezy.com/packs/media/components/global/search-explore-nav/img/vectors/term-bg-1-666de2d941529c25aa511dc18d727160.jpg',
                          embeds: [different_ip],
                        });
  
                      }})
                    
  
                    res.send("wrong ip")
                  }
                  
                }
              )
  
  
  
  
  
              // --------------
            })
        })
    }else{
      res.send("Pls don't try to hack you nn dog 1")
    }

   



  });


  router.post('/lua', (req, res) => {
    console.log('ran')
    // console.log(req.headers)
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
                    if(user.hwid == hwid){
                      // Get information about a known ip
                      
  
                      res.send("done")
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



  module.exports = router;