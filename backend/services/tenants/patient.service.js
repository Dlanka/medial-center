const { body, validationResult } = require("express-validator");
const PatientModel = require("../../models/tenants/patient.model");
const {
  subYears,
  setDay,
  setMonth,
  setDate,
  set,
  format,
  subMonths,
} = require("date-fns");

const registrationValidation = [
  body("fullName", "Full name is required").trim().notEmpty(),
  body("dob", "Age is required").isFloat({ min: 0, max: 120 }),
];

class PatientService {
  static config = {
    registrationValidation,
  };

  static isFieldsValid(req) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 422;
      error.errors = errors.array();
      throw error;
    }
  }

  static calDOB(age) {
    let today = new Date();

    if (Number.parseFloat(age) < 1) {
      const d = subMonths(today, String(age).split(".")[1]);
      return set(d, { date: 1 });
    }

    today = set(today, { month: 0, date: 1 });

    return subYears(new Date(today), age);
  }

  static async create(req) {
    this.isFieldsValid(req);

    const dob = this.calDOB(req.body.dob);

    const patient = await PatientModel(req.tenantDb).create({
      ...req.body,
      dob: format(dob, "yyyy-MM-dd"),
    });

    return patient;
  }
}

module.exports = PatientService;
