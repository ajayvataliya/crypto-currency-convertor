const express = require("express");
const router = express.Router();
const {AuthController: Controller} = require("../controllers");

/** [POST] /api/v1/auth */
router.post('/', Controller.login);

/** [POST] /api/v1/auth/register */
router.post('/register', Controller.add);

/** [GET] /api/v1/auth/logout */
router.get('/logout', Controller.logout);

module.exports = router;
