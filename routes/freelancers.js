const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const paramValidator = require("../middleware/validateParamId");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { Category } = require("../models/category");
const { Freelancer, validate } = require("../models/freelancer");

router.post("/api/freelancers", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let freelancer = await Freelancer.findOne({ email: req.body.email });
  if (freelancer) return res.status(400).send("user is already defined");

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(404).send("category not found");
  //_.pick(req.body, ["name", "email", "phone", "password"]),

  freelancer = new Freelancer({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.phone,
    category: { _id: category._id, title: category.title }
  });

  const salt = await bcrypt.genSalt(10);
  freelancer.password = await bcrypt.hash(req.body.password, salt);

  await freelancer.save();

  const token = freelancer.generateAuthToken();

  return res
    .header("x-auth-token", token)
    .send(_.pick(freelancer, ["name", "email"]));
});

router.put("/api/freelancers/:id", [auth, paramValidator], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(404).send("category not found");

  const freelancer = await Freelancer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.phone,
      category: { _id: category._id, title: category.title }
    },
    { new: true }
  );

  res.send(freelancer);
});

router.delete(
  "/api/freelancers/:id",
  [auth, paramValidator],
  async (req, res) => {
    const freelancer = await Freelancer.findByIdAndRemove(req.params.id);
    res.send(freelancer);
  }
);

module.exports = router;
