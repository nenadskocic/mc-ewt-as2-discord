const { Client, Intents } = require("discord.js");

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

client.on("ready", function() {
    console.log(`Logged in as ${client.user.tag}`);
});

client.login("ODk2ODQ1NjE1NzE0MTY0NzM3.YWNCkQ.oV2KzjRDrLtjLU7CWMNckTVua6s");
