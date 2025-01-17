const { getTenantConnection } = require("../config/database");

const tenantMiddleware = async (req, res, next) => {
  const tenantId = req.headers["x-tenant-id"];

  if (!tenantId) {
    return res.status(400).json({ error: "Tenant ID is required" });
  }

  try {
    const connection = await getTenantConnection(tenantId);
    req.tenantId = tenantId;
    req.tenantDb = connection;
    next();
  } catch (error) {
    res.status(500).json({ error: "Unable to connect to tenant database" });
  }
};

module.exports = tenantMiddleware;
