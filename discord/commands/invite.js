const { RichEmbed } = require('discord.js');

module.exports = {
    name: "invite",
    description: "Gives invitation link",
    usage: "invite",
    category: "utility",
    note: "None",
    run: (client, message, args) => {
        const embed = new RichEmbed()
            .setTitle("Invite me to your server!")
            .setColor('NAVY')
            .setURL("https://discordapp.com/oauth2/authorize?client_id=668344087740547106&scope=bot")
            .setDescription("Want to add Gen to your server? Just click the link!")
            .setImage(client.user.displayAvatarURL);
        message.reply(embed);
    }
}