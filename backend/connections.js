// Funciones para verificar conexión a Moodle y Zoom
const axios = require('axios');
const config = require('./config');

async function checkMoodleConnection() {
  try {
    // Llamada simple al API REST de Moodle para obtener el usuario actual
    const url = `${config.moodle.url}/webservice/rest/server.php`;
    const params = {
      wstoken: config.moodle.token,
      wsfunction: 'core_webservice_get_site_info',
      moodlewsrestformat: 'json',
    };
    const start = Date.now();
    const response = await axios.get(url, { params, timeout: 5000 });
    const responseTime = Date.now() - start;
    if (response.data && response.data.siteid) {
      return { connected: true, version: response.data.release || 'unknown', lastCheck: new Date().toISOString(), responseTime };
    }
    return { connected: false, error: response.data, lastCheck: new Date().toISOString(), responseTime };
  } catch (error) {
    return { connected: false, error: error.message, lastCheck: new Date().toISOString(), responseTime: null };
  }
}

async function checkZoomConnection() {
  try {
    // OAuth 2.0 Client Credentials Grant para obtener access_token
    const tokenUrl = 'https://zoom.us/oauth/token';
    const credentials = Buffer.from(`${config.zoom.clientId}:${config.zoom.clientSecret}`).toString('base64');
    const params = new URLSearchParams({
      grant_type: 'account_credentials',
      account_id: config.zoom.accountId,
    });
    const start = Date.now();
    const response = await axios.post(tokenUrl + '?' + params.toString(), null, {
      headers: {
        Authorization: `Basic ${credentials}`,
      },
      timeout: 5000,
    });
    const responseTime = Date.now() - start;
    if (response.data && response.data.access_token) {
      return { connected: true, lastCheck: new Date().toISOString(), responseTime };
    }
    return { connected: false, error: response.data, lastCheck: new Date().toISOString(), responseTime };
  } catch (error) {
    return { connected: false, error: error.message, lastCheck: new Date().toISOString(), responseTime: null };
  }
}

module.exports = { checkMoodleConnection, checkZoomConnection };
