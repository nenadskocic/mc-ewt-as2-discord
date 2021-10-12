/*
    "StAuth10222: I Nenad Skocic, 000107650 certify that this material is my original work. No other person's work has been used 
    without due acknowledgement. I have not made my work available to anyone else."
*/

const CoinMarketCap = require("./coinmarketcap.js");
const { Client, Intents } = require("discord.js");

const cmc = new CoinMarketCap();

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

client.on("ready", function() {
    console.log(`Logged in as ${client.user.tag}`);
});


client.on("messageCreate", async message => {
    command = message.content.toLowerCase().split(" ");
    
    if(command[0] == "top") {
        async function top() {
            try {
                op1 = parseFloat(command[1]);
                const data = await cmc.get_latest_listings();

                let x = JSON.stringify(op1);
                // Temp array for sliced data
                let arr = [];
                let topList = [];
                // Slices data at the user provided value
                arr = data.data.slice(0, x);

                for (i = 0; i < arr.length; i++) {
                    // Adds the name of the Cryptocurreny an its respective rank to a new array
                    topList += `${arr[i].cmc_rank}: ${arr[i].name}\n`;
                }
                // BOT responds back to user with the list
                await message.reply(topList);
            } catch (error) {
                console.log(error);
            }
        }  
        top();      
    }
});

// Discord BOT Token
client.login("ODk2ODQ1NjE1NzE0MTY0NzM3.YWNCkQ.oV2KzjRDrLtjLU7CWMNckTVua6s");
