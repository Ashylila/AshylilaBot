const Discord = require('discord.js')
require('dotenv').config()

const client = new Discord.Client({intents: [
  "Guilds",
  "GuildMessages",
  "GuildMembers"
]})

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`)
})

client.on("messageCreate", (message) =>{
  if (message.content == "Hi"){
    message.reply("Hello world")
  }
})