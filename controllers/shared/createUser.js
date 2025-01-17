const { validationResult, body } = require("express-validator");
const User = require("../../models/user.model");
const Tenant = require("../../models/tenant.model");

const userValidation = [
  body("username").trim().not().isEmpty().withMessage("Username is required"),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long."),
  body("email")
    .isEmail()
    .withMessage("Please enter the valid email")
    .normalizeEmail(),
];

const createNewUser = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const error = new Error("Validation failed");
        error.statusCode = 422;
        error.errors = errors.array();
        throw error;
      }

      const isUsernameExist = await User.findOne({
        where: { username: req.body.username },
      });

      if (isUsernameExist) {
        const error = new Error("This username already existing");
        error.statusCode = 422;
        throw error;
      }

      const isEmailExist = await User.findOne({
        where: { email: req.body.email },
      });

      if (isEmailExist) {
        const error = new Error("This email already existing");
        error.statusCode = 422;
        throw error;
      }

      if (req.tenantId) {
        const hasATenant = await Tenant.findByPk(req.tenantId);

        if (!hasATenant) {
          const error = new Error("Tenant not found!");
          error.statusCode = 422;
          throw error;
        }
      }

      const user = await User.create({
        ...req.body,
        tenantId: req.tenantId || 0,
      });

      const userRes = user.toJSON();
      delete userRes.password;

      resolve(userRes);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { createNewUser, userValidation };
