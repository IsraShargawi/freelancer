const winston = require("winston");
const express = require("express");
const app = express();

require("./startup/config")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/logging")();
require("./startup/validatObjId")();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`connect to port ${port}`));

module.exports = server;
