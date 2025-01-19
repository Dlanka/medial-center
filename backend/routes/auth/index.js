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

/**
 * POST
 * auth/refresh-token
 *
 * body
 * {
 *    "refreshToken": 'rf-token'
 * }
 */

router.post("/refresh-token", AuthController.refreshToken);

/**
 * POST
 * auth/logout
 *
 * body
 * {
 *    "refreshToken": 'rf-token'
 * }
 *
 */

router.post("/logout", AuthController.logout);

module.exports = router;
