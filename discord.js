const Discord = require("discord.js")
const ipInfo = require("ipinfo")



const webhook = new Discord.WebhookClient("868412218776096809","JUz2O9ytTnNsN2W3PZHnotPUjhYADrxlI1GgUo6KxKrpY3uN1hlxYDASbRcgOQk-FrgI")


const embed_unsuccessfull_user_pass = new Discord.MessageEmbed()
.setTitle('Unsuccessful login')
.setColor('#ff0000')
.addField('USERNAME', 'adorable')
.addField('IP ADRESS', '123.232.232')
.addField('LOCATION', 'BD, LKDJF')
.addField('HWID', 'j8eyrasdf93lasdjf83lksdjf')
.addField('CAUSE', 'WRONG USERNAME/PASSWORD')
.setFooter('Tesla.lua');

const embed_success = new Discord.MessageEmbed()
.setTitle('Successful Login')
.setColor('#00c91e')
.addField('USERNAME', 'adorable')
.addField('IP ADRESS', '123.232.232')
.addField('LOCATION', 'BD, LKDJF')
.addField('HWID', 'j8eyrasdf93lasdjf83lksdjf')
.setFooter('Tesla.lua');

// 
const wrong_hwid = new Discord.MessageEmbed()
.setTitle('Wrong HWID')
.setColor('#1e00c9')
.addField('USERNAME', 'adorable')
.addField('IP ADRESS', '123.232.232')
.addField('LOCATION', 'BD, LKDJF')
.addField('HWID', 'asdf2987dsafk398s7df')
.setFooter('Tesla.lua');

// 
const different_ip = new Discord.MessageEmbed()
.setTitle('Different IP')
.setColor('#c95000')
.addField('USERNAME', 'adorable')
.addField('IP ADRESS', '123.232.232')
.addField('LOCATION', 'BD, LKDJF')
.addField('HWID', 'asdf2987dsafk398s7df')
.setFooter('Tesla.lua');

webhook.send('!d bump');




// ip info