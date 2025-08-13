// Controller for Zoom bulk meeting creation
const fs = require('fs');
const csv = require('csv-parser');
const { createMeeting } = require('../utils/zoom');

exports.zoomBulkUpload = async (req, res) => {
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
};
