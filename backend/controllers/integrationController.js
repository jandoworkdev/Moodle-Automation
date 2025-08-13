// Controller for integration status and Zoom check
const { checkZoomConnection } = require('../connections');
const config = require('../config');

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

exports.getIntegrationStatus = (req, res) => {
  res.json(status);
};

exports.checkZoom = async (req, res) => {
  const result = await checkZoomConnection();
  status.zoom.connected = result.connected;
  status.zoom.lastCheck = result.lastCheck;
  status.zoom.error = result.error;
  status.zoom.responseTime = result.responseTime;
  res.json(result);
};
