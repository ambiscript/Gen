/*------------------------------------*\
 *             =- GEN -=              *
 *      General-Use Discord Bot       *
 *                                    *
 *           Harley Grace             *
 *                                    *
 *    Thanks to An Idiot's Guide:     *
 *      https://anidiots.guide/       *
\*------------------------------------*/

const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const client = new Discord.Client();
client.config = require(`${__dirname}/config.json`);
client.prefix = client.config.prefix;

/*--------------------------------------*\
 *             Event Handler            *
\*--------------------------------------*/
fs.readdir(`${__dirname}/events/`, (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        // Ignore non-JS files
        if (!file.endsWith(".js")) return;
        const event = require(`${__dirname}/events/${file}`);
        // Isolates event name from extension
        let eventName = file.split(".")[0];
        // Takes action when event is emitted, and binds client to action
        client.on(eventName, event.bind(null, client))
        // Removes event from require cache(?)
        delete require.cache[require.resolve(`./events/${file}`)];
    });
});

/*--------------------------------------*\
 *            Command Handler           *
\*--------------------------------------*/
client.commands = new Enmap();
// Map each command to client.commands map
fs.readdir(`${__dirname}/commands/`, (err, files) => {
    if (err) return console.log(err);
    files.forEach(file => {
        // Ignore non-JS files
        if (!file.endsWith(".js")) return;
        let props = require(`${__dirname}/commands/${file}`);
        // Isolates command name from extension
        let commandName = file.split(".")[0];
        console.log(`Attempting to load command: ${commandName}`);
        // Pairs command path to command name
        client.commands.set(commandName, props);
    });
});

client.login(client.config.token);