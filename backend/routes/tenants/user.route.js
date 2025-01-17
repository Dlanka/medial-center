const express = require("express");
const UserService = require("../../services/user.service");
const TenantUserController = require("../../controllers/tenants/user.controller");

const router = express.Router();

router.post(
  "/create",
  UserService.config.userFieldValidations,
  TenantUserController.create
);

module.exports = router;
