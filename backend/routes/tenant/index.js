const express = require("express");
const { body } = require("express-validator");

const controller = require("../../controllers/tenant.controller");
const Tenant = require("../../models/tenant.model");

const router = express.Router();

/**
 * POST
 * tenants/create
 */
const validations = [
  body("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name is required")
    .custom(async (value) => {
      console.log("val", value);
      const isNameExist = await Tenant.findOne({ where: { name: value } });
      console.log("val", value, !!isNameExist);
      if (!!isNameExist) {
        throw new Error("Name already in use");
      }
    }),
];

router.post("/create", validations, controller.create);

module.exports = router;
