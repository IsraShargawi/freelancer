const mongoose = require("mongoose");
const config = require("config");
const winston = require("winston");

module.exports = function() {
  mongoose.set("useNewUrlParser", true);
  mongoose.set("useFindAndModify", false);
  mongoose.set("useCreateIndex", true);
  const db = config.get("db");
  mongoose.connect(db).then(winston.info(`connected Successfully to ${db}`));
};
