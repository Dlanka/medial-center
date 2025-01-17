const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Redis = require("ioredis");
const { v4: uuidv4 } = require("uuid");

const UserService = require("../services/user.service");

const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || 6379,
  // password: process.env.REDIS_PASSWORD
});

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const generateTokens = (user) => {
  const payload = {
    email: user.email,
    userId: user.id,
    username: user.username,
  };

  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

const storeRefreshToken = async (userId, refreshToken) => {
  const tokenId = uuidv4();
  // Store token with user info and expiration

  await redis.setex(
    `refresh_token:${tokenId}`,
    7 * 24 * 60 * 60, // 7 days in seconds
    JSON.stringify({
      userId,
      refreshToken,
      tokenId,
    })
  );

  // Add to user's token set
  await redis.sadd(`user_tokens:${userId}`, tokenId);

  return tokenId;
};

class AuthController {
  static async create(req, res, next) {
    try {
      const userRes = await UserService.createNewUser(req);

      res
        .status(201)
        .json({ message: "User created successfully", result: userRes });
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    }
  }

  static async login(req, res, next) {
    const authorize = req.body.authorize;
    const password = req.body.password;

    try {
      const user = await UserService.loginCredential({ authorize, password });

      const { accessToken, refreshToken } = generateTokens(user);

      const tokenId = await storeRefreshToken(user.id, refreshToken);

      res.status(200).json({
        message: "User login successfully",
        result: {
          user: { email: user.email, userId: user.id, username: user.username },
          accessToken,
          refreshToken: tokenId,
        },
      });
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    }
  }

  static async test(req, res, next) {}
}

module.exports = AuthController;

// exports.update = async (req, res, next) => {
//   const id = req.params.id;

//   try {
//     const user = await User.findByPk(id);

//     if (!user) {
//       const error = new Error("User not found");
//       error.statusCode = 404;
//       throw error;
//     }

//     user.set({
//       ...req.body,
//       password: user.password,
//     });

//     await user.save();

//     res.status(200).json({ message: "User updated successfully", user });
//   } catch (error) {
//     if (!error.statusCode) {
//       error.statusCode = 500;
//     }
//     next(error);
//   }
// };

// exports.login = async (req, res, next) => {
//   const authorize = req.body.authorize;
//   const password = req.body.password;

//   try {
//     const user = await User.findOne({
//       where: {
//         [Op.or]: [{ username: authorize }, { phoneNumber: authorize }],
//       },
//     });

//     if (!user) {
//       const error = new Error(
//         "Provided username or phone number could not found!"
//       );
//       error.statusCode = 401;
//       throw error;
//     }

//     if (!user.isActive) {
//       const error = new Error(
//         "This user is not activated yet, please contact the administration."
//       );
//       error.statusCode = 401;
//       throw error;
//     }

//     const isPasswordMatch = await bcrypt.compare(password, user.password);

//     if (!isPasswordMatch) {
//       const error = new Error("Yor entered password is invalid");
//       error.statusCode = 401;
//       throw error;
//     }

//     const token = jwt.sign(
//       { email, userId: user._id.toString(), name: user.name },
//       "supper-secret",
//       { expiresIn: "1h" }
//     );

//     res.status(200).json({
//       message: "User login successfully",
//       result: {
//         user_id: user._id.toString(),
//         user_name: user.name,
//         web_token: token,
//       },
//     });
//   } catch (err) {
//     if (!err.statusCode) {
//       err.statusCode = 500;
//     }
//     next(err);
//   }
// };
