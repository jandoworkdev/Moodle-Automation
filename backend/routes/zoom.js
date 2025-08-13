// Zoom bulk upload route
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const { zoomBulkUpload } = require('../controllers/zoomController');

router.post('/api/zoom-bulk-upload', upload.single('file'), zoomBulkUpload);

module.exports = router;
