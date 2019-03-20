const winston = require("winston");
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("access denied. no token provided");

  try {
    const decode = jwt.verify(token, config.get("jwtPrivateKey"));
    res.user = decode;
    next();
  } catch (error) {
    winston.error(error.message, "invalid token!");
    res.status(400).send("invalid token");
  }
};
