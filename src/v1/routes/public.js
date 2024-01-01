const express = require("express")
const router = express.Router();
const {PublicController} = require("../controllers");
const {validator} = require('../helpers/validator');
const {PublicValidation} = require('../validations')

/**
 * @api [GET] /api/v1/public/getCurrencies
 * @apiDescription Get all currencies
 * @apiVersion 1.0.0
 * @apiName getCurrencies
 * @apiPermission public
 *
 *
 *
 * @apiSuccessExample {
    "code": 200,
    "success": true,
    "data": [
          {
            "name": "Albanian Lek (L)",
            "value": "ALL"
        }, ... ]
    "error": null,
    "message": ""
}
 *
 *
 * @apiError (Error 500)        Something went wrong
 */
router.get('/getCurrencies', PublicController.getAllCurrencies)

/**
 * @api [GET] /api/v1/public/getAllCryptoCurrencyInfo
 * @apiDescription Get top 100 Crypto Currency
 * @apiVersion 1.0.0
 * @apiName getAllCryptoCurrencyInfo
 * @apiPermission public
 *
 *
 * @apiSuccessExample {
    "code": 200,
    "success": true,
    "data": [
        {
            "name": "Bitcoin (BTC)",
            "value": "BTC"
        },...]
    "error": null,
    "message": ""
}
 *
 *
 * @apiError (Error 500)        Something went wrong
 */
router.get('/getAllCryptoCurrencyInfo', PublicController.getAllCryptoCurrencyInfo);


/**
 * @api [POST] /api/v1/public/getCurrencyConverterRate
 * @apiDescription Get Currency Converter Rate base on cryptocurrency and currency
 * @apiVersion 1.0.0
 * @apiName getCurrencyConverterRate
 * @apiPermission public
 *
 *@apiQueryParams
 * symbol  Required
 * convert  Required
 * rate  Required
 *
 *
 * @apiSuccessExample {
    "code": 200,
    "success": true,
    "data": {
        "rate": 2,
        "cryptoValue": 3556074.153406772,
        "result": 7112148.306813544
    },
    "error": null,
    "message": ""
}
 *
 *
 * @apiError (Error 500)        Something went wrong
 */
router.get('/getCurrencyConverterRate', (req, res, next) => validator(req, res, next, PublicValidation.getCurrencyRateValidation), PublicController.getCurrencyConverterRate);


module.exports = router;
