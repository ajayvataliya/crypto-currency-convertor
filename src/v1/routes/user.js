const express = require("express")
const router = express.Router();
const {UserController: Controller} = require("../controllers");
const UploadProduct = require("../../middleware/upload-item")

router.use('/images', express.static('images'))

router.get('', Controller.list);

router.get('/:id', Controller.list);

router.post('', UploadProduct.single('image'), Controller.add);

router.put('/:id', Controller.update);

router.delete('/:id', Controller.destroy);

module.exports = router;
