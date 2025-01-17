const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const adminRoutes = require("./routes/admin");
const tenantsRoutes = require("./routes/tenants");

const { mainDBConnection } = require("./config/database");
const tenantMiddleware = require("./middlewares/tenant.middleware");

const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "_" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (["image/png", "image/jpg", "jpeg"].includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const singleImageUploader = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
}).single("image");

const app = express();

app.use(singleImageUploader);
app.use(bodyParser.json());

app.use("/images", express.static(path.join(__dirname, "images")));

// Set headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

// Initialize main database
async function initializeMainDatabase() {
  try {
    await mainDBConnection.authenticate();
    console.log("Main database connected successfully.");

    // Sync all models in main database
    await mainDBConnection.sync({ force: true, logging: console.log });
    console.log("Main database models synchronized.");
  } catch (error) {
    console.error("Unable to connect to main database:", error);
  }
}

// Routes that need tenant context
app.use("/tenant", tenantMiddleware);

// Admin Routes
app.use("/admin", adminRoutes);

// /tenant/*
app.use("/tenant", tenantsRoutes);

// Error handle middleware
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const errors = error.errors;

  res.status(status).json({
    message,
    errors,
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  initializeMainDatabase();
});
