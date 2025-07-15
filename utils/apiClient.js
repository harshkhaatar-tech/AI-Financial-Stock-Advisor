const axios = require('axios');

const alphaVantage = axios.create({
  baseURL: 'https://www.alphavantage.co/query',
  params: {
    apikey: process.env.ALPHAVANTAGE_API_KEY,
  },
});

module.exports = { alphaVantage };