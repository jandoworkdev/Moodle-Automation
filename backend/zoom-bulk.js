// Bulk Zoom meeting creation from CSV (Node.js, Express, Multer, Axios)
const express = require('express');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const axios = require('axios');
const config = require('./config');
const router = express.Router();

// Multer setup for file upload
const upload = multer({ dest: 'uploads/' });

// Get Zoom access token
async function getAccessToken() {
  const tokenUrl = 'https://zoom.us/oauth/token';
  const credentials = Buffer.from(`${config.zoom.clientId}:${config.zoom.clientSecret}`).toString('base64');
  const params = new URLSearchParams({
    grant_type: 'account_credentials',
    account_id: config.zoom.accountId,
  });
  const response = await axios.post(tokenUrl + '?' + params.toString(), null, {
    headers: { Authorization: `Basic ${credentials}` },
  });
  return response.data.access_token;
}

// Create a Zoom meeting
async function createMeeting({ fecha, hora, titulo, duracion, agenda }) {
  const token = await getAccessToken();
  // Convert fecha (dd/mm/yyyy) and hora (HH:MM) to ISO string in Lima timezone
  const [day, month, year] = fecha.split('/');
  const startTime = new Date(`${year}-${month}-${day}T${hora}:00-05:00`).toISOString();
  const meetingData = {
    topic: titulo,
    type: 2,
    start_time: startTime,
    duration: parseInt(duracion, 10),
    timezone: 'America/Lima',
    agenda: agenda || 'Sin agenda',
    settings: {
      join_before_host: false,
      waiting_room: true,
    },
  };
  const url = 'https://api.zoom.us/v2/users/me/meetings';
  const headers = { Authorization: `Bearer ${token}` };
  const resp = await axios.post(url, meetingData, { headers });
  return {
    titulo: resp.data.topic,
    fecha: resp.data.start_time,
    enlace: resp.data.join_url,
  };
}

// POST /api/zoom-bulk-upload
router.post('/api/zoom-bulk-upload', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const results = [];
  const errors = [];
  try {
    const rows = [];
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (row) => rows.push(row))
      .on('end', async () => {
        for (const row of rows) {
          try {
            const datos = await createMeeting(row);
            results.push(datos);
          } catch (e) {
            errors.push({ row, error: e.message });
          }
        }
        fs.unlinkSync(req.file.path);
        res.json({ created: results, errors });
      });
  } catch (err) {
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
