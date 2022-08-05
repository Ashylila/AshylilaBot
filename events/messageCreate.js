
const sadWords = require('/home/runner/Discord/bot.js');
const encouragements = require('/home/runner/Discord/bot.js');
const { messageLink } = require('discord.js');
module.exports = {
    name: "messageCreate",
    execute(message) {
      if (message.author == client.tag ) 
    //if (sadWords.some(word => message.content.includes(word))){
      //  const encouragement = encouragements [Math.floor(Math.random() * encouragements.length)]
        //message.reply(encouragement)
        message.reply("hey"))
    }
  }
//}