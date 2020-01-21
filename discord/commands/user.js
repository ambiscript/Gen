const { RichEmbed } = require('discord.js');

module.exports = {
    name: "user",
    description: "Gives information about specified user",
    usage: "user @user",
    category: "utility",
    note: "None",
    run: (client, message, args) => {
        if (args.length !== 1) return message.reply("Must specify exactly one user.");
        let member = message.mentions.members.array()[0];
        let dsc;
        const embed = new RichEmbed({color: member.displayColor})
            .setTitle(member.nickname || member.user.username)
            .setThumbnail(member.user.displayAvatarURL)
            .setFooter(member.user.tag,member.user.displayAvatarURL);
        if (member.user.presence.game) {
            dsc = `${member.user.presence.status}, in game: ${member.user.presence.game.name}.`
        } else {
            dsc = `${member.user.presence.status}, not in game.`
        }
        embed.setDescription(dsc);
        message.reply(embed);
    }
}