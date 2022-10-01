const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const upload = require('multer')();

const Discord = require("discord.js")
const ipInfo = require("ipinfo")

const webhook = new Discord.WebhookClient("860565651760087080","6oVY8LqOJI23zu3PlYOPVS4g2nBaUBiPf9ibIJYCEJ2N-GgKEFwxU_ZjtkJgu_fJl4Qv")




// User Model
const User = require('../../models/User');


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
            if(!isMatch){
              ipInfo(ip_, (err, cLoc5) => {
                if(cLoc5.status !== 404){
                   
                const embed_unsuccessfull_user_pass = new Discord.MessageEmbed()
                .setTitle('Unsuccessful login [BETA]')
                .setColor('#ff0000')
                .addField('USERNAME', `${user.name}`)
                .addField('IP ADRESS', `${ip_}`)
                .addField('LOCATION', `${cLoc5.country}, ${cLoc5.region}`)
                .addField('HWID', `${hwid}`)
                .addField('CAUSE', 'WRONG USERNAME/PASSWORD')
                .setFooter('Tesla.lua');

                    webhook.send('', {
                      username: 'Tesla Skeet Logs',
                      avatarURL: 'https://i.pinimg.com/originals/b0/46/8c/b0468c61baa72515ada2838c236466e8.jpg',
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
                  if(user.hwid == hwid){
                    // Get information about a known ip
                    ipInfo(ip_, (err, cLoc) => {
                        
                      if(cLoc.status !== 404){
                          console.log(cLoc)
                          // Success Login EMBED

                          const embed_success = new Discord.MessageEmbed()
                          .setTitle('Successful Login [BETA]')
                          .setColor('#00c91e')
                          .addField('USERNAME', `${user.name}`)
                          .addField('IP ADRESS', `${ip_}`)
                          .addField('LOCATION', `${cLoc.country}, ${cLoc.region}`)
                          .addField('HWID', `${hwid}`)
                          .setFooter('Tesla.lua');

                          webhook.send('', {
                            username: 'Tesla Skeet Logs',
                            avatarURL: 'https://i.pinimg.com/originals/b0/46/8c/b0468c61baa72515ada2838c236466e8.jpg',
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
                        .setTitle('Wrong HWID [BETA]')
                        .setColor('#1e00c9')
                        .addField('USERNAME', `${user.name}`)
                        .addField('IP ADRESS', `${ip_}`)
                        .addField('LOCATION', `${cLoc2.country}, ${cLoc2.region}`)
                        .addField('HWID', `${hwid}`)
                        .setFooter('Tesla.lua');

                        webhook.send('', {
                          username: 'Tesla Skeet Logs',
                          avatarURL: 'https://i.pinimg.com/originals/b0/46/8c/b0468c61baa72515ada2838c236466e8.jpg',
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
                      .setTitle('Different IP [BETA]')
                      .setColor('#c95000')
                      .addField('USERNAME', `${user.name}`)
                      .addField('IP ADRESS', `${ip_}`)
                      .addField('LOCATION', `${cLoc3.country}, ${cLoc3.region}`)
                      .addField('HWID', `${hwid}`)
                      .setFooter('Tesla.lua');
                      
                      webhook.send('', {
                        username: 'Tesla Skeet Logs',
                        avatarURL: 'https://i.pinimg.com/originals/b0/46/8c/b0468c61baa72515ada2838c236466e8.jpg',
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
  });


  router.get('/lua', (req, res) => {
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
  });

  module.exports = router;