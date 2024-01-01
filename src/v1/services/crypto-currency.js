const axios = require('axios');
const {crypto} = require('../../config')

exports.GetCryptoCurrency  = async (convert) => {
    try {
        const params = {
            start: 1,
            limit: 100,
            convert: convert || 'USD'
        }
        console.log('======params', params)
        return await axios.get(`${crypto.apiUrl}/cryptocurrency/listings/latest`, {
            params,
            headers: {
                'X-CMC_PRO_API_KEY': crypto.apiKey
            }
        });
    } catch (error) {
        throw error;
    }
}


exports.GetCryptoCurrencyBySymbol  = async (convert, symbol) => {
    try {
        const params = {
            convert: convert || 'USD',
            symbol
        }
        console.log('======params', params)
        return await axios.get(`${crypto.apiUrl}/cryptocurrency/quotes/latest`, {
            params,
            headers: {
                'X-CMC_PRO_API_KEY': crypto.apiKey
            }
        });
    } catch (error) {
        throw error;
    }
}


exports.getAllCurrencies = async () => {
    try {
        const params = {
            sort: "name"
        }
        return await axios.get(`${crypto.apiUrl}/fiat/map`, {
            params,
            headers: {
                'X-CMC_PRO_API_KEY': crypto.apiKey
            }
        });
    } catch (error) {
        throw error;
    }
}
