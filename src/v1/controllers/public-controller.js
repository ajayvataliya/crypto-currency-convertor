const {CryptoServices} = require('../services')

exports.getAllCryptoCurrencyInfo = async (req, res) => {
    try {

        const {convert} = req.params;
        const getCryptoCurrencyInfo = await CryptoServices.GetCryptoCurrency(convert);

        if (getCryptoCurrencyInfo?.status === 200) {
            const data = getCryptoCurrencyInfo?.data?.data || [];
            const dataToSend = (data || []).map(item => {
                return {name: `${item.name} (${item.symbol})`, value: item.symbol}
            })
            return res.data(dataToSend || []);
        } else {
            return res.message("Something went wrong!");
        }

    } catch (e) {
        return res.error(e);
    }
}

exports.getCurrencyConverterRate = async (req, res) => {
    try {

        const {symbol, convert, rate} = req.query;
        const getCryptoCurrencyInfo = await CryptoServices.GetCryptoCurrencyBySymbol(convert, symbol);

        if (getCryptoCurrencyInfo?.status === 200) {

            const cryptoResponse = getCryptoCurrencyInfo?.data?.data; // get crypto data from response
            const cryptoValue = cryptoResponse[symbol]['quote'][convert]['price'] || 0; // get crypto current value

            return res.data({rate, cryptoValue, result: cryptoValue * rate || 0});
        } else {
            return res.message("Something went wrong!");
        }
    } catch (e) {
        return res.error(e);
    }
}

exports.getAllCurrencies = async (req, res) => {
    try {

        const allCurrencies = await CryptoServices.getAllCurrencies();

        if (allCurrencies?.status === 200) {
            const data = allCurrencies?.data?.data || [];
            const dataToSend = (data || []).map(item => {
                return {name: `${item.name} (${item.sign})`, value: item.symbol}
            })
            return res.data(dataToSend || []);
        } else {
            return res.message("Something went wrong!");
        }

    } catch (e) {
        return res.error(e);
    }
}

