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

        Latest Crypto listings: https://coinmarketcap.com/api/documentation/v1/#operation/getV1CryptocurrencyListingsLatest
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

    /*
        Method: GET 
        Endpoint: /v1/partners/flipside-crypto/fcas/listings/latest

        FCAS scores: https://coinmarketcap.com/api/documentation/v1/#operation/getV1CryptocurrencyCategories
    */
    async get_latest_FCAS() {
        try {
            const response = await axios.get('https://pro-api.coinmarketcap.com/v1/partners/flipside-crypto/fcas/listings/latest', {
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
    /*
        Method: GET 
        Endpoint: /v1/cryptocurrency/quotes/latest

        Latest quotes: https://coinmarketcap.com/api/documentation/v1/#operation/getV1CryptocurrencyQuotesLatest

        Manually requested only the recent top 5 (minus USDT - stablecoin)

    */
    async get_latest_quotes() {
        try {
            const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest', {
                params: {
                    symbol: "BTC,ETH,BNB,ADA,XRP"
                },
                headers: {
                    'X-CMC_PRO_API_KEY' : 'e05d2063-30ff-48f4-8303-27fa191262e0'
                },
                json: true,
                gzip: true
            })
            return response.data;

        } catch (error) {
            console.error(error);
        }
    }
}

// Exports modules for methods to be used in discord_bot.js
module.exports = CoinMarketCap;