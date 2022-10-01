const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const fs = require('fs')
const Item = require('../../models/Item');
const Config = require('../../models/Config');
const path = require('path');
// @route   GET api/items
// @desc    Get All Items
// @access  Public

const Discord = require("discord.js")
const ipInfo = require("ipinfo");
const { config } = require('process');
const webhook = new Discord.WebhookClient("972053501582639114","51m-_NHDYIag_uaenk6shIHI3Cui0RYQlQJ0IwRvZOBV_Dwb0YfDFr5HW9zyaWcdkyTf")

// https://discord.com/api/webhooks/972053501582639114/51m-_NHDYIag_uaenk6shIHI3Cui0RYQlQJ0IwRvZOBV_Dwb0YfDFr5HW9zyaWcdkyTf
router.get('/', (req, res) => {
    const { username } = req.query;

    Item.find({name: username})  
    .then(item => {
     
        if(item.length == 0){
            console.log("Not Found")
                // sent
                res.send("notfound")
                ipInfo(req.clientIp, (err, cLoc5) => {
                    if(cLoc5.status !== 404){
                      
                    const fail_login = new Discord.MessageEmbed()
                    .setTitle('USER NOT FOUND!')
                    .setColor('#e62e09')
                    .addField('IP ADDRESS', `${req.clientIp}`)
                    .addField('LOCATION', `${cLoc5.country}, ${cLoc5.region}, ${cLoc5.city}`)
                    .addField('ISP', `${cLoc5.org}`)
                    .addField('TimeZone', `${cLoc5.timezone}`)
                    .addField('INFO', 'User not found with username = ' + username)
                    .setFooter('Vector.lua');
                
                        webhook.send('', {
                          username: 'Vector.lua',
                          avatarURL: 'https://static.vecteezy.com/packs/media/components/global/search-explore-nav/img/vectors/term-bg-1-666de2d941529c25aa511dc18d727160.jpg',
                          embeds: [fail_login],
                        });
                
                    }})
            
        }else{
            console.log("User found")
    
                
                res.send("success")

                // sent

                ipInfo(req.clientIp, (err, cLoc5) => {
                    if(cLoc5.status !== 404){
                      
                    const logiN_complete = new Discord.MessageEmbed()
                    .setTitle('LUA IS SENT')
                    .setColor('#05f211')
                    .addField('IP ADDRESS', `${req.clientIp}`)
                    .addField('LOCATION', `${cLoc5.country}, ${cLoc5.region}, ${cLoc5.city}`)
                    .addField('ISP', `${cLoc5.org}`)
                    .addField('TimeZone', `${cLoc5.timezone}`)
                    .addField('INFO', 'Lua is sent completed to ' + username)
                    .setFooter('Vector.lua');
                
                        webhook.send('', {
                          username: 'Vector.lua',
                          avatarURL: 'https://static.vecteezy.com/packs/media/components/global/search-explore-nav/img/vectors/term-bg-1-666de2d941529c25aa511dc18d727160.jpg',
                          embeds: [logiN_complete],
                        });
                
                    }})

        }
    })
    .catch(err => res.status(404).json({ success: false }));

 
});


router.get('/createconfig',  (req, res) => {
    const {configdata} = req.query;
    if(configdata != ""){
        Config.findOne({}, {}, { sort: { 'date' : -1 } }, function(err, post) {
            let latestId =( parseInt(post.id)  + 1).toString();
            
            // console.log(configdata)
            const newItem = new Config({
                id: latestId,
                config: configdata
              });
            
              newItem.save().then(item => res.send(`Your config id is ${item.id}`))
              .catch(e=>{
                  console.log("ERROUR FOUND")
              })
        });
    }
 
});

router.get('/getconfig',  (req, res) => {
    const {configid} = req.query;
    if(configid != ""){
        Config.findOne({id: configid})
        .then(data =>{
            res.send(data.config)
        })
        .catch(e=>{
            res.send("NOTFOUND")
        })
    }
 
});

module.exports = router;
