const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');

router.post('/create-audience', campaignController.createAudience);
router.post('/send-message', campaignController.sendMessage);
router.post('/delivery-receipt', campaignController.deliveryReceipt);
router.get('/', campaignController.getCampaigns);

module.exports = router;
