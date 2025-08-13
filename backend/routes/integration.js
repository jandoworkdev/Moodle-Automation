// Integration and Zoom status endpoints
const express = require('express');
const router = express.Router();
const { getIntegrationStatus, checkZoom } = require('../controllers/integrationController');

router.get('/api/integration-status', getIntegrationStatus);
router.post('/api/check-zoom', checkZoom);

module.exports = router;
