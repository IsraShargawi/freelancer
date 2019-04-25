const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const paramValidator = require("../middleware/validateParamId");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { Customer, validate } = require("../models/customer");

router.get("/", async (req, res) => {
  const customer = await Customer.find().skip(6);

  res.send(customer);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = await Customer.findOne({ email: req.body.email });
  if (customer) return res.status(400).send("user is already defined");
  customer = new Customer(_.pick(req.body, ["name", "email", "password"]));

  const salt = await bcrypt.genSalt(10);
  customer.password = await bcrypt.hash(req.body.password, salt);

  await customer.save();

  const token = customer.generateAuthToken();

  return res
    .header("x-auth-token", token)
    .send(_.pick(customer, ["name", "email"]));
});

router.delete("/:id", [auth, paramValidator], async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  res.send(customer);
});

module.exports = router;
