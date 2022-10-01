const express = require('express');
const multer = require("multer");
const mongoose = require('mongoose');
const path = require('path');
var bodyParser = require('body-parser')
const fs = require('fs')
const UploadModel = require('./models/Upload');
const Item = require('./models/Item');

const config = require('config');
const auth = require("./middleware/auth");
const date = require("date-and-time");
const router = express.Router();
const requestIp = require('request-ip');


const app = express();

app.use(requestIp.mw())
app.use(express.static('uploads/'));
app.use(bodyParser.urlencoded({ extended: false }))
const now = new Date();
const newDate = date.format(now, 'YYYY-MM-DD-HH');
const { uuid } = require('uuidv4');
var uuid_temp = ""
const storage = multer.diskStorage({
  destination: "./public/",
  filename: function(req, file, cb){
   
     cb(null,"uploadlua" + ".txt");
  }
});

app.use(express.json());

const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
}).single("myfile");



const obj =(req,res) => {
  if(req.query.token == "vzNh22CBQm05JEsdfgeV4810NfvsdfgDybYd5mdIEKAfEryAMmrz414"){
    upload(req, res, () => {
      console.log("nothing to save")
      
      fs.readFile(path.join(__dirname, `./public/uploadlua.txt`), 'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        // console.log(Buffer.from(data).toString('base64'))
     
        // console.log()
        // const newLua = new Store({
        //     lua: Buffer.from(data).toString('base64')
        // });
        // newLua.save().then(gaylua=> console.log("done") );
        const filter = { _id: '61fe5b2e33c463384c3a45da' };
        const update = { lua: Buffer.from(data).toString('base64') };
    
        // `doc` is the document _after_ `update` was applied because of
        // `new: true`
        Store.findOneAndUpdate(filter, update, {
          new: true
        }, (error,doc)=>{
          console.log("updated to db")
        })
    
      })

    });
  }else{
    res.json({error:"Token Error"})
  }


}

// DB Config
const db = config.get('mongoURI');

// Connect to Mongo
mongoose
  .connect(db, { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));




// Use Routes
//AUTHOR:A!VEE
app.use('/api/users', require('./routes/api/users'));
// app.use('/api/admin', require('./routes/api/create_admin'));
app.use('/api/auth', require('./routes/api/auth'));
app.use("/api/lua",require("./routes/api/lua"))
app.use("/api/lua_login",require("./routes/api/auth_lua"))
app.use("/api/trn",require("./routes/api/translator"))
app.use("/api/users",require("./routes/api/users"))

app.use("/api/vector", require("./routes/api/vector"))

// app.use("/api/betalua",require("./routes/api/beta_lua"))
// app.use("/api/beta_login",require("./routes/api/auth_beta"))

app.use("/api/invite",require("./routes/api/invite"))
app.use("/upload",obj)

// Serve static assets if in production
// process.env.NODE_ENV === 'production'
if (true) {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


// Discord bot here
const Discord = require("discord.js");
const client = new Discord.Client({
    intents:[
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES
    ]
});

client.on("ready", ()=>{
  console.log("DHIT")
})

client.on('message',msg =>{
  if(msg.content.startsWith("!add") && msg.content.split(" ").length == 2){

     if (msg.member.roles.cache.some(role => role.name === 'Admin')) {
      const newItem = new Item({
        name: msg.content.split(" ")[1]
      });
    
      newItem.save().then(item => 
        {
          msg.channel.send(`${msg.content.split(" ")[1]} has been added successfully!`)
        })  .catch(err => msg.channel.send("ERROR!"));
     }


  }

  if(msg.content.startsWith("!remove") && msg.content.split(" ").length == 2){

    if (msg.member.roles.cache.some(role => role.name === 'Admin')) {
      Item.findOne({name: msg.content.split(" ")[1]})
    .then(item => item.remove().then(() => msg.channel.send(`${msg.content.split(" ")[1]} has been removed from database!`)))
    .catch(err =>{
      msg.channel.send("ERROR!")
      console.log(err)
    } );
    }


 }

  if(msg.content.startsWith("!list") && msg.content.length == 5){

    if (msg.member.roles.cache.some(role => role.name === 'Admin')) {
      let result = ""
      Item.find({}).then(data=>{
       data.map(user =>{
        result += ` ${user.name}, `

       })

       msg.channel.send(result)
      })  .catch(err => msg.channel.send("ERROR!"));

     
    }


 }

 function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
 if(msg.content == "!roll"){
        msg.channel.send(`${msg.author.username} rolled ${getRandomInt(0,9)}`)
  }
  if(msg.content == "gay"){
    if(getRandomInt(1,2) ==1){
      msg.channel.send(`${msg.author.username} is not gay!`)
    }else{
      msg.channel.send(`${msg.author.username} is gay!`)
    }
    
}



})
// toke = OTcyMzc0NzE4NTMzNDc2NDMy.YnYIhg.-VkjQ-xn6X5lDMTxhYowWtFhQBw
client.login("OTcyMzc0NzE4NTMzNDc2NDMy.YnYIhg.-VkjQ-xn6X5lDMTxhYowWtFhQBw")


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

