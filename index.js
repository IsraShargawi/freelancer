require("express-async-errors");
const winston = require("winston");
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

require("./startup/config")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/logging")();
require("./startup/validatObjId")();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`connect to port ${port}`));

module.exports = server;
