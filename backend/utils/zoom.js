// Utils for Zoom API integration
const axios = require('axios');
const config = require('../config');

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

async function createMeeting({ fecha, hora, titulo, duracion, agenda }) {
  const token = await getAccessToken();
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

module.exports = { getAccessToken, createMeeting };
