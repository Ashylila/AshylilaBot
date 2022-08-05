const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data : new SlashCommandBuilder().setName('server').setDescription('Displays server information'),
  async execute (interaction) {
      await interaction.reply(`Server name: ${interaction.guild.name} Member count: ${interaction.guild.memberCount}`);
  }
}