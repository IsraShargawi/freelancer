const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const paramValidator = require("../middleware/validateParamId");
const _ = require("lodash");
const fs = require("fs");
const { Freelancer, validate } = require("../models/freelancer");
const {
  getAllFreelancers,
  isExist,
  getCategory,
  addFreelancer,
  updateFreelancer,
  deleteFreelancer
} = require("../controllers/freelancer_controller");
const { getAuthToken } = require("../services/authTokenService");

router.get("/", async (req, res) => {
  const freelancers = await getAllFreelancers();
  res.send(freelancers);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let freelancer = await isExist({ email: req.body.email });
  if (freelancer) return res.status(400).send("user is already defined");

  const category = await getCategory(req.body.categoryId);
  if (!category) return res.status(404).send("category not found");

  const payload = await addFreelancer(req.body, category);

  const token = getAuthToken(payload);

  return res.header("x-auth-token", token).send(payload);
});

router.put("/:id", [auth, paramValidator], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await getCategory(req.body.categoryId);
  if (!category) return res.status(404).send("category not found");

  const payload = await updateFreelancer(req.body, req.params.id, category);

  res.send(payload);
});

router.delete("/:id", [auth, paramValidator], async (req, res) => {
  const payload = await deleteFreelancer(req.params.id);
  res.send(payload);
});

module.exports = router;
