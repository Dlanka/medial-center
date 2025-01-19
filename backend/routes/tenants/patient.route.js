const express = require("express");
const PatientController = require("../../controllers/tenants/patient.controller");
const PatientService = require("../../services/tenants/patient.service");

const router = express.Router();

router.post(
  "/create",
  PatientService.config.registrationValidation,
  PatientController.create
);

module.exports = router;
