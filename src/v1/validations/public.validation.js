const Joi = require('joi');

const getCurrencyRateValidation =  Joi.object({
        symbol: Joi.string().required(),
        convert: Joi.string().required(),
        rate: Joi.number().required()
});

module.exports = {
    getCurrencyRateValidation
};
