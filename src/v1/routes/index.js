const express = require("express")
const publicRoutes = require('./public');
const router = express.Router();

/** Public routes */
router.use('/public', publicRoutes)


module.exports = router;
