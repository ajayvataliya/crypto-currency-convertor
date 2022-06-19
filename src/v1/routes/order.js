const express = require("express")
const router = express.Router();
const {OrderController: Controller} = require("../controllers");

/** [GET] /api/v1/auth/order */
router.get('', Controller.list);

/** [GET] /api/v1/auth/order/:id */
router.get('/:id', Controller.list);

/** [POST] /api/v1/auth/order */
router.post('/', Controller.add);

/** [PUT] /api/v1/auth/order */
router.post('/', Controller.update);

/** [GET] /api/v1/auth/order/ids */
router.get('/ids', Controller.orderIDs);

module.exports = router;
