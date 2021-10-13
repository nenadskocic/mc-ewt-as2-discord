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
                const listings = await cmc.get_latest_listings();
                let x = JSON.stringify(op1);
                // Temp array for sliced data
                let arr = [];
                let topList = [];
                // Slices data at the user provided value
                arr = listings.data.slice(0, x);

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

    if(command[0] == "price") {
        async function price() {
            try {
                op1 = command[1].toUpperCase();
                const quotes = await cmc.get_latest_listings();

                for (i = 0; i < quotes.data.length; i++) {
                    if(quotes.data[i].symbol == op1) {
                        await message.reply(`${quotes.data[i].quote.USD.price.toFixed(3)} USD`);
                    } 
                }                
            } catch (error) {
                console.log(error);
            }
        }
        price();
    }

    if(command[0] == "score") {
        async function score() {
            try {
                op1 = command[1].toUpperCase();
                op2 = command[2].toUpperCase();
                const fcas = await cmc.get_latest_FCAS();

                let score1 = 0;
                let symbol1 = "";
                let score2 = 0;
                let symbol2 = "";

                for(i = 0; i < fcas.data.length; i++) {
                    if(fcas.data[i].symbol == op1) {
                        score1 = `${fcas.data[i].score}`;
                        symbol1 = op1;
                    }
                    if(fcas.data[i].symbol == op2) {
                        score2 = `${fcas.data[i].score}`;
                        symbol2 = op2;
                    }
                }

                if(score1 > score2) {
                    await message.reply(`${symbol1} has a score of ${score1}, while ${symbol2} has a score of ${score2}. ${symbol1} is a healthier project.`);
                } else {
                    await message.reply(`${symbol1} has a score of ${score1}, while ${symbol2} has a score of ${score2}. ${symbol2} is a healthier project.`);
                }
            } catch (error) {
                console.log(error);
            }
        }
        score();
    } 

    if(command[0] == "metric") {
        async function metric() {
            try {
                op1 = command[1].toUpperCase();
                op2 = command[2].toUpperCase();
                const metrics = await cmc.get_latest_quotes();

                let perc_change1 = 0.0;
                let symbol1 = "";
                let perc_change2 = 0.0;
                let symbol2 = "";
                
                for (i in metrics.data) {
                    if(metrics.data[i].symbol == op1) {
                        perc_change1 = `${metrics.data[i].quote.USD.percent_change_7d.toFixed(2)}`;
                        symbol1 = op1;
                    }
                    if(metrics.data[i].symbol == op2) {
                        perc_change2 = `${metrics.data[i].quote.USD.percent_change_7d.toFixed(2)}`;
                        symbol2 = op2;
                    }
                }
                if(perc_change1 > perc_change2) {
                    await message.reply(`${symbol1} moved ${perc_change1}% in 7 days, beating ${symbol2} (${perc_change2}%). ${symbol1} is trending`);
                } else {
                    await message.reply(`${symbol1} moved ${perc_change1}% in 7 days, losing to ${symbol2} (${perc_change2}%). ${symbol2} is trending`)
                }
              
            } catch (error) {
                console.log(error);
            }
        }
        metric();
    }


});

// Discord BOT Token
client.login("ODk2ODQ1NjE1NzE0MTY0NzM3.YWNCkQ.oV2KzjRDrLtjLU7CWMNckTVua6s");
