const express = require("express")
const router = express.Router();
const {ProductController} = require("../controllers");

/** [GET] /api/v1/public/products */
router.get('/products', ProductController.list);

module.exports = router;
