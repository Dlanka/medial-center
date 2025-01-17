const { Op } = require("sequelize");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("../models/user.model");
const Tenant = require("../models/tenant.model");
const { Status } = require("../constant");

const userFieldValidations = [
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

class UserService {
  static config = {
    userFieldValidations,
  };

  static async findOne(options) {
    return await User.findOne(options);
  }

  static isFieldsValid(req) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 422;
      error.errors = errors.array();
      throw error;
    }

    return true;
  }

  static async isUserNameExist(username) {
    return await this.findOne({
      where: { username },
    });
  }

  static async isUserEmailExist(email) {
    return await this.findOne({
      where: { email },
    });
  }

  static async createNewUser(req) {
    // validate request body fields
    this.isFieldsValid(req);

    const isUsernameExist = await this.isUserNameExist(req.body.username);

    if (isUsernameExist) {
      const error = new Error("This username already existing");
      error.statusCode = 422;
      throw error;
    }

    const isEmailExist = await this.isUserEmailExist(req.body.email);

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

    return userRes;
  }

  static async loginCredential(data) {
    const user = await this.findOne({
      where: {
        [Op.or]: [{ username: data.authorize }, { email: data.authorize }],
      },
    });

    if (!user) {
      const error = new Error("Username or email could not found!");
      error.statusCode = 401;
      throw error;
    }

    if (user.status !== Status.Activated) {
      const error = new Error(
        "This user is not activated yet, please contact the administration."
      );
      error.statusCode = 401;
      throw error;
    }

    const isPasswordMatch = bcrypt.compareSync(data.password, user.password);

    if (!isPasswordMatch) {
      const error = new Error("Yor entered password is invalid");
      error.statusCode = 401;
      throw error;
    }

    return user;
  }
}

module.exports = UserService;
