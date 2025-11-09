/**
 * Minimal controller for health checks.
 * Useful to validate server + DB connectivity.
 */
export const health = async (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
};
