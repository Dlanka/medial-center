const PatientService = require("../../services/tenants/patient.service");

class PatientController {
  static async create(req, res, next) {
    try {
      const patient = await PatientService.create(req);

      res
        .status(201)
        .json({ message: "Patient created successfully", result: patient });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PatientController;
