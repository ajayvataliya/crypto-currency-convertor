module.exports = {
    env: process.env.ENV,
    server: {
        name: process.env.SERVER_NAME || 'server',
        port: process.env.SERVER_PORT || 9000,
    },
    crypto: {
        apiUrl: process.env.COIN_MARKET_CAP_API_URL || 'https://pro-api.coinmarketcap.com/v1',
        apiKey: process.env.COIN_MARKET_CAP_KEY
    }
}
