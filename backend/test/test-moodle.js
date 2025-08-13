// Test para probar la función local_metrics_get_site_metrics de Moodle
const { getSiteMetrics } = require('../moodle-stats');

async function testSiteMetrics() {
  console.log('Probando local_metrics_get_site_metrics...');
  const metrics = await getSiteMetrics();
  console.log('Respuesta completa:', metrics);
  if ('active_courses' in metrics) {
    console.log('Cursos activos:', metrics.active_courses);
  }
  if ('total_users' in metrics) {
    console.log('Usuarios:', metrics.total_users);
  }
}

testSiteMetrics();
