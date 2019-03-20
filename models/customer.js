const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 6, maxlength: 255 },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true, minlength: 6, maxlength: 255 }
});

customerSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    { _id: this._id, name: this.name },
    config.get("jwtPrivateKey")
  );
};

const Customer = mongoose.model("Customer", customerSchema);

function validateCustomer(customer) {
  const schema = {
    name: Joi.string()
      .min(6)
      .max(255)
      .required(),
    email: Joi.string()
      .min(6)
      .max(50)
      .email({ minDomainAtoms: 2 })
      .required(),
    password: Joi.string()
      .min(6)
      .max(255)
      .required()
  };
  return Joi.validate(customer, schema);
}

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;
