const jwt = require("jsonwebtoken");
require("dotenv").config();

const authmiddleware = (req, res, next) => {
  const token = req.header("authorization");

  if (!token) {
    return res.status(401).json({
      message: "Access Denied:",
    });
  }
  try {
    const verified = jwt.verify(token, process.env.PRIVATE_KEY);
    req.user = verified;
    next();
  } catch (error) {
    res.status(401).json({
      message: "invalid token:",
    });
  }
};

module.exports = authmiddleware;
