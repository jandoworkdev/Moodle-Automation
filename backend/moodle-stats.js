// Funciones para obtener datos reales de Moodle
const axios = require('axios');
const config = require('./config');

// Nueva función para consumir el servicio web dedicado de métricas
async function getSiteMetrics() {
  try {
    const url = `${config.moodle.url}/webservice/rest/server.php`;
    const params = {
      wstoken: config.moodle.token,
      wsfunction: 'local_metrics_get_site_metrics',
      moodlewsrestformat: 'json',
    };
    const response = await axios.get(url, { params, timeout: 5000 });
    return response.data;
  } catch (error) {
    return { active_courses: 0, total_users: 0 };
  }
}

module.exports = { getSiteMetrics };
