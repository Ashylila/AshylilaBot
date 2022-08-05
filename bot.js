const fs = require('node:fs');
const dotenv = require('dotenv');
const path = require('node:path');
const { Client, Intents, Collection, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [3243773] });
const token = process.env['token'];
const Database = require("@replit/database")
const db = new Database;
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

const sadWords = ["sad", "depressed", "unhappy", "angry"];
const starterEncouragements = [
    "Cheer up!",
    "Hang in there",
    "You are a great person!"
]

db.get("encouragements").then(encouragements => {
    if (!encouragements || encouragements.length < 1 ) {
        db.set("encouragements", starterEncouragements)
    }
})
const encouragements = db.get("encouragements")
function updateEncouragments(enouragingMessage) {
    db.get("encouragments").then(encouragements => {
        encouragements.push([encouragingMessage])
        db.set("encouragments", encouragements)
    })
}

function deleteEncouragment (index){
    db.get("encouragments").then(encouragements => {
        if (encouragements.length > index){
            encouragements.splice(index, 1)
            db.set("encouragments", encouragements)
        }
    })
} 
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles){
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

for(const file of eventFiles){
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if(event.once){
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.on('interactionCreate', async interaction => {
if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;
  
try {
  await command.execute(interaction);
} catch (error) {
  console.error(error);
  await interaction.reply({ content: 'There was an error while executing this command!'});
}
  
  }
);

client.login(token);