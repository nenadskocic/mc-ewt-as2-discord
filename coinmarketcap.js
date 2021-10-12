/*
    "StAuth10222: I Nenad Skocic, 000107650 certify that this material is my original work. No other person's work has been used 
    without due acknowledgement. I have not made my work available to anyone else."

    CoinMarketCap API: https://coinmarketcap.com/api/documentation/v1/#section/Quick-Start-Guide
*/

const axios = require('axios');

class CoinMarketCap {
    constructor() {}

    /*
        Method: GET 
        Endpoint: /v1/cryptocurrency/listings/latest
    */
    async get_latest_listings() {
        try {
            const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
                headers: {
                    'X-CMC_PRO_API_KEY' : 'e05d2063-30ff-48f4-8303-27fa191262e0'
                },
                json: true,
                gzip: true
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}

// Exports modules for methods to be used in discord_bot.js
module.exports = CoinMarketCap;