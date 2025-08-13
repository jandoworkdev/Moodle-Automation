// Simple Express backend for Moodle and Zoom connection status
const express = require('express');
const cors = require('cors');
const config = require('./config');
const { checkMoodleConnection, checkZoomConnection } = require('./connections');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());


// Simulated stats (replace with real data later)
let stats = {
  activeCourses: 247,
  users: 1834,
};

let status = {
  moodle: {
    connected: true,
    version: '4.5',
    lastCheck: new Date().toISOString(),
    url: config.moodle.url,
    responseTime: null,
    error: null,
  },
  zoom: {
    connected: false,
    lastCheck: new Date().toISOString(),
    apiKey: config.zoom.apiKey ? 'SET' : 'NOT_SET',
    responseTime: null,
    error: null,
  },
};

const { getSiteMetrics } = require('./moodle-stats');

// Endpoint para obtener indicadores de cursos y usuarios desde el nuevo servicio web
app.get('/api/indicators', async (req, res) => {
  const metrics = await getSiteMetrics();
  // Adaptar nombres de campos si es necesario
  res.json({
    activeCourses: metrics.active_courses || 0,
    users: metrics.total_users || 0,
  });
});

// Endpoint to get integration status
app.get('/api/integration-status', (req, res) => {
  res.json(status);
});


// Endpoint para verificar conexión a Moodle
app.post('/api/check-moodle', async (req, res) => {
  const result = await checkMoodleConnection();
  status.moodle.connected = result.connected;
  status.moodle.lastCheck = result.lastCheck;
  status.moodle.version = result.version || status.moodle.version;
  status.moodle.error = result.error;
  status.moodle.responseTime = result.responseTime;
  res.json(result);
});

// Endpoint para verificar conexión a Zoom
app.post('/api/check-zoom', async (req, res) => {
  const result = await checkZoomConnection();
  status.zoom.connected = result.connected;
  status.zoom.lastCheck = result.lastCheck;
  status.zoom.error = result.error;
  status.zoom.responseTime = result.responseTime;
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
