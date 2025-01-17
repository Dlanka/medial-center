function pathReplace(value) {
  return value.replace("\\", "/");
}

function createDBName(tenantId) {
  return `${process.env.TENANT_DB_PREFIX}${tenantId}`;
}

module.exports = {
  pathReplace,
  createDBName,
};
