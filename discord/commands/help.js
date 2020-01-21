const { RichEmbed } = require('discord.js');

module.exports = {
    name: "help",
    description: "Provides information about the given command",
    usage: "help command",
    category: "utility",
    note: "None",
    run: (client, message, args) => {
        if (!args || args.length < 1) return message.reply("Must provide command to receive information.");
        const commandName = args[0];
        if (!client.commands.has(commandName)) {
            return message.reply(`Unknown command: ${commandName}`);
        }
        let command = client.commands.get(commandName);
        const embed = new RichEmbed()
            .setTitle('Help Page')
            .setColor('NAVY')
            .addField('Command', command.name, false)
            .addField('Description', command.description, true)
            .addField('Usage', `\`${client.prefix}${command.usage}\``)
            .addField('Note', command.note);
        
        message.reply(embed);
    }
}