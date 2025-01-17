const { Sequelize } = require("sequelize");
const { createDBName } = require("../helper");
require("dotenv").config();

// Tenant connection pool
const tenantConnections = new Map();

const rootConnection = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: false,
});

const mainDBConnection = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "main_db",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: false,
});

//
const createDatabase = async (tenantId) => {
  try {
    const dbName = createDBName(tenantId);

    // Create the database
    await rootConnection.query(`CREATE DATABASE IF NOT EXISTS ${dbName};`);
    console.log(`Database ${dbName} created successfully`);

    // Create connection to new database
    const connection = new Sequelize({
      dialect: "mysql",
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: dbName,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      logging: false,
    });

    // Test the connection
    await connection.authenticate();

    return connection;
  } catch (error) {
    console.error("Error creating database:", error);
    throw error;
  }
};

const createTenantDatabase = async (tenantId) => {
  try {
    // Create new database
    const connection = await createDatabase(tenantId);

    // Store connection
    tenantConnections.set(tenantId, connection);

    // Initialize database schema
    // await initializeTenantSchema(connection);

    return connection;
  } catch (error) {
    console.error(`Error creating tenant database for ${tenantId}:`, error);
    throw error;
  }
};

// Create connection for a specific tenant
const createTenantConnection = async (tenantId) => {
  const dbName = createDBName(tenantId);

  const sequelize = new Sequelize({
    dialect: "mysql",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: dbName,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: false,
  });

  await sequelize.authenticate();
  return sequelize;
};

const getTenantConnection = async (tenantId) => {
  if (!tenantConnections.has(tenantId)) {
    const connection = await createTenantConnection(tenantId);
    tenantConnections.set(tenantId, connection);
  }
  return tenantConnections.get(tenantId);
};

module.exports = {
  mainDBConnection,
  getTenantConnection,
  createTenantConnection,
  createTenantDatabase,
};
