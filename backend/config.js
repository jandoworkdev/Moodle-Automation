// Configuración de credenciales y URLs para Moodle y Zoom
module.exports = {
  moodle: {
    url: process.env.MOODLE_URL || 'https://apac.net.pe/',
    token: process.env.MOODLE_TOKEN || '756dcbb935aeb6ba1f577d3bb7dda2bd',
  },
  zoom: {
    accountId: process.env.ZOOM_ACCOUNT_ID || 'QgWoA-rlQaWXgOB3yHPpVw',
    clientId: process.env.ZOOM_CLIENT_ID || 'g1770wpsT4ujpOeVMYolYA',
    clientSecret: process.env.ZOOM_CLIENT_SECRET || 'UD1oWiTTl4vmSx7ERRklMr2C3aOwqC0v',
  },
};
