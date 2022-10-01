// const fs = require('fs')
// const path = require("path")

// const config = require('config');
// const Store = require('../../models/Store');

// fs.readFile(path.join(__dirname, `./public/LUA.txt`), 'utf8' , (err, data) => {
//     if (err) {
//         console.error(err)
//         return
//     }
//     // console.log(data)
 

//     const newLua = new Store({
//         lua: uuidv4(Buffer.from(data).toString('base64'))
//     });
//     newLua.save().then(gaylua=> console.log("done") );
// })


const base58 = require('base58-encode');
 
console.log(base58('hello world')); // => 'StV1DL6CwTryKyV'
// base58(Buffer.from('hello world')) // node
// new Uint8Array(Array.from('hello world').map(c => c.charCodeAt(0))) // Browser
// // => 'StV1DL6CwTryKyV'
// base58('hello world', base58.XRP); // => 'StVrDLaUATiyKyV'

