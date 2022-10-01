const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const { translate } = require('free-translate');



// Get Posts
router.get("/chat",async function(req,res){

  // console.log()

  const {name,msg,languageChat,languageTo} = req.query;
  console.log(msg)
  const translatedText = await translate(msg, { to: 'en' });
  
  const finalText = `${name} --> ${translatedText}`
  console.log("ran")
  res.send(finalText); 


});

// Get Posts
// router.post("/chat",async function(req,res){



//   const {name,msg,languageChat,languageTo} = req.body;

//   const translatedText = await translate(msg, { to: 'en' });
  
//   const finalText = `${name} --> ${translatedText}`
//   console.log("ran")
//   res.send(finalText); 


// });

router.get("/input",async function(req,res){
  // All input to korean

  const {name,msg,} = req.query;
  console.log(msg)
  const translatedText = await translate(msg, { to: 'ko' });
      
  res.send(translatedText); // これはカッコいい！


});




module.exports = router;