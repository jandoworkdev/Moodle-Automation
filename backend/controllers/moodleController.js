// Controller for Moodle endpoints
const { checkMoodleConnection } = require('../connections');
const { getSiteMetrics } = require('../moodle-stats');

exports.getIndicators = async (req, res) => {
  const metrics = await getSiteMetrics();
  res.json({
    activeCourses: metrics.active_courses || 0,
    users: metrics.total_users || 0,
  });
};

exports.checkMoodle = async (req, res) => {
  const result = await checkMoodleConnection();
  res.json(result);
};
