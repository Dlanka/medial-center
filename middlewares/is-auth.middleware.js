const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    const error = new Error("Not authenticated");
    error.statusCode = 401;
    throw error;
  }

  const [_, token] = authHeader.split(" ");

  let decodeToken;

  try {
    if (!token) {
      const error = new Error("Not token attached!");
      error.statusCode = 401;
      throw error;
    }

    decodeToken = jwt.verify(token, "supper-secret");
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }

  if (!decodeToken) {
    const error = new Error("Not authenticated!");
    error.statusCode = 401;
    throw error;
  }

  req.userId = decodeToken.userId;
  next();
};
