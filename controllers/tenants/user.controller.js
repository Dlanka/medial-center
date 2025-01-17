const { Op } = require("sequelize");
const UserService = require("../../services/user.service");

class TenantUserController {
  static async create(req, res, next) {
    try {
      const isUserExist = await UserService.findOne({
        where: {
          [Op.or]: { email: req.body.email, username: req.body.username },
        },
      });

      if (isUserExist) {
        const error = new Error("Email or username already exist!");
        error.statusCode = 422;
        throw error;
      }

      const userRes = await UserService.createNewUser(req);

      res
        .status(201)
        .json({ message: "Tenant User created successfully", result: userRes });
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    }
  }
}

module.exports = TenantUserController;
