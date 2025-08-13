// Simple Express backend for Moodle and Zoom connection status
const express = require('express');
const cors = require('cors');
const zoomBulkRouter = require('./routes/zoom');
const moodleRouter = require('./routes/moodle');
const integrationRouter = require('./routes/integration');
const app = express();
const PORT = process.env.PORT || 4000;



app.use(cors());
app.use(express.json());
app.use(zoomBulkRouter);
app.use(moodleRouter);
app.use(integrationRouter);



app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
