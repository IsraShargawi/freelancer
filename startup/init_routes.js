const express = require("express");
const customers = require("../routes/customers");
const freelancers = require("../routes/freelancers");
const login = require("../routes/login");
const chats = require("../routes/chats");
const error = require("../middleware/error");
const headers = require("../middleware/resHeaders");
module.exports = function(app) {
  app.use(express.json());
  app.use(headers);
  app.use("/", login);
  app.use("/api/customers", customers);
  app.use("/api/freelancers", freelancers);
  app.use("/api/chats", chats);
  app.use(error);
};
