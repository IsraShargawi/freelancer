const jwt = require("jsonwebtoken");
const config = require("config");

function getAuthToken(payload) {
    return jwt.sign(payload,config.get("jwtPrivateKey"));
  };



  module.exports.getAuthToken = getAuthToken;  