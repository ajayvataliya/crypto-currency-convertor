const express = require("express")
const router = express.Router();
const {ProductController: Controller} = require("../controllers");
const UploadProduct = require("../../middleware/upload-item")

/** [GET] /api/v1/auth/product */
router.get('', Controller.list);

/** [GET] /api/v1/auth/product/:id */
router.get('/:id', Controller.list);

/** [POST] /api/v1/auth/product */
router.post('/', UploadProduct.single('image'), Controller.add);

/** [PUT] /api/v1/auth/product/:id */
router.put('/:id', UploadProduct.single('image'), Controller.update);

/** [DELETE] /api/v1/auth/product/:id */
router.delete('/:id', Controller.destroy);

module.exports = router;
