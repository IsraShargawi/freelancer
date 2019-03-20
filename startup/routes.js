const express = require("express");
const customers = require("../routes/customers");
const freelancers = require("../routes/freelancers");
const login = require("../routes/login");
const error = require("../middleware/error");
module.exports = function(app) {
  app.use(express.json());
  app.use("/", login);
  app.use("/", customers);
  app.use("/", freelancers);
  app.use(error);
};
