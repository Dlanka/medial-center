const express = require("express");

const patientRoutes = require("./patient.route");
const userRoutes = require("./user.route");

const router = express.Router();

router.use("/patient", patientRoutes);
router.use("/user", userRoutes);

module.exports = router;
