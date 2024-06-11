const express = require('express');
const router = express.Router();

router.use('/customers', require('./Customers'));
router.use('/orders', require('./orders'));
router.use('/campaigns', require('./campaigns'));

module.exports = router;
