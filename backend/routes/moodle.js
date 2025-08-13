// Moodle endpoints
const express = require('express');
const router = express.Router();
const { getIndicators, checkMoodle } = require('../controllers/moodleController');

router.get('/api/indicators', getIndicators);
router.post('/api/check-moodle', checkMoodle);

module.exports = router;
