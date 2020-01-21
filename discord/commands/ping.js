module.exports = {
    name: "ping",
    description: "Replies with Pong and delay (in ms). Used to check bot connection.",
    usage: "ping",
    category: "utility",
    note: "None",
    run: (client, message, args) => {
        message.reply("Pong!").catch(console.error).then((pong) => {
            pong.edit(`${pong.content} | ${pong.createdAt - message.createdAt}ms`);
        });
    }
}