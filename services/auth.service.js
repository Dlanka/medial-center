const User = require("../models/user.model");
const UserService = require("./user.service");

class AuthService {
  constructor() {
    this.user = User;
    this.userService = UserService;
  }

  static async create() {
    try {
    } catch (error) {}

    return await User.findOne(options);
  }
}
