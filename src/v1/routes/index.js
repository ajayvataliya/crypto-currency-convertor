const express = require("express")
const authRoutes = require('./auth');
const productRoutes = require('./products');
const publicRoutes = require('./public');
const orderRoutes = require('./order')
const authenticate = require('../../middleware/authenticate');
const router = express.Router();

/** Public routes */
router.use('/public', publicRoutes)

/** Auth routes */
router.use('/auth', authRoutes)

/** Inject middleware */
router.use(authenticate);

/** Product routes */
router.use('/product', productRoutes)

/** Order routes */
router.use('/order', orderRoutes)

module.exports = router;
