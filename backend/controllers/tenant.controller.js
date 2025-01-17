const { validationResult } = require("express-validator");
const Tenant = require("../models/tenant.model");
const {
  createTenantConnection,
  createTenantDatabase,
} = require("../config/database");
const { createDBName } = require("../helper");

exports.create = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 422;
      error.errors = errors.array();
      throw error;
    }

    // Create tenant
    const tenant = await Tenant.create(req.body);
    const dbName = createDBName(tenant.id);

    // Set database name in the dbName column
    tenant.dbName = dbName;

    // update tenant table
    await tenant.save();

    // Create Table with tenant id
    await createTenantDatabase(tenant.id);

    res
      .status(201)
      .json({ message: "Tenant created successfully", result: tenant });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
