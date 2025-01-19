const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const authMiddleware = async (req, res, next) => {
  const authHeader = req.get("Authorization");

  const [_, token] = authHeader.split(" ");

  let decodeToken;

  try {
    if (!token) {
      const error = new Error("Not token attached!");
      error.statusCode = 401;
      throw error;
    }

    decodeToken = jwt.verify(token, ACCESS_TOKEN_SECRET);

    if (!decodeToken) {
      const error = new Error("Not authenticated!");
      error.statusCode = 401;
      throw error;
    }

    req.user = decodeToken;
    req.userId = decodeToken.userId;
    next();
  } catch (error) {
    error.statusCode = 401;
    error.message = "Not authenticated!, token invalid";

    next(error);
  }
};

module.exports = authMiddleware;
