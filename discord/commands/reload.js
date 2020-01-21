module.exports = {
    name: "reload",
    description: "Reloads command in bot memory. Allows commands to be updated without resetting bot.",
    usage: "reload command",
    category: "admin",
    note: "Only accessible to bot admin.",
    run: (client, message, args) => {
        if (message.author.id !== client.config.adminID) return message.reply("You don't have access to that command.");
        if (!args || args.length < 1) return message.reply("Must provide command to reload.");
        const commandName = args[0];
        console.log(`Attempting to reload command: ${commandName}`);
        if (!client.commands.has(commandName)) {
            return message.reply(`Unknown command: ${commandName}`);
        }
        delete require.cache[require.resolve(`./${commandName}.js`)];
        client.commands.delete(commandName);
        const props = require(`./${commandName}.js`);
        client.commands.set(commandName, props);
        console.log(`Command succesfully reloaded`)
        message.reply(`The command ${commandName} has been reloaded.`);
    }
}