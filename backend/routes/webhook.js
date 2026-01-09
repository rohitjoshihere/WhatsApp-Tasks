const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhookController');

router.get('/whatsapp', webhookController.verifyWebhook);
router.post('/whatsapp', webhookController.handleWebhook);

module.exports = router;
