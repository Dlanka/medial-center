const express = require("express");
const AuthController = require("../../controllers/auth.controller");
const UserService = require("../../services/user.service");

const router = express.Router();

/**
 * POST
 * auth/create
 */

router.post(
  "/create",
  UserService.config.userFieldValidations,
  AuthController.create
);

/**
 * PUT
 * auth/update/:id
 */
// router.put("/update/:id", authController.update);

/**
 * POST
 * auth/login
 */
router.post("/login", AuthController.login);

module.exports = router;
