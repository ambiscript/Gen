const { RichEmbed } = require('discord.js');

module.exports = {
    name: "commands",
    description: "Lists all available commands",
    usage: "commands",
    category: "utility",
    note: "None",
    run: (client, message, args) => {
        const embed = new RichEmbed()
            .setTitle("Commands")
            .setColor("NAVY");
        client.commands.forEach(command => {
            embed.addField(command.name, command.description);
        });
        message.reply(embed);
    }
}