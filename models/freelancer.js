const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { categorySchema } = require("./category");
const config = require("config");
const multer = require("multer");
//const JoiImage = Joi.extend(image_extention);

const freelancerSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 6, maxlength: 255 },
  bio: { type: String, minlength: 3, maxlength: 255 },
  email: { type: String, required: true },
  phone: {
    type: String,
    validate: {
      validator: function(v) {
        return v.length === 10;
      }
    },
    required: true
  },
  category: {
    type: categorySchema,
    required: true
  },
  image: { type: Buffer, dataContnet: String },
  password: { type: String, required: true, minlength: 6, maxlength: 255 },
  skills: [String],
  rate: Number,
  expertise: [String],
  price: Number
});

freelancerSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    { _id: this._id, name: this.name },
    config.get("jwtPrivateKey")
  );
};

const Freelancer = mongoose.model("Freelancer", freelancerSchema);

function validateFreelancer(freelancer) {
  const schema = {
    name: Joi.string()
      .min(6)
      .max(50)
      .required(),
    bio: Joi.string()
      .min(10)
      .max(255),
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .min(6)
      .max(50)
      .required(),
    phone: Joi.string()
      .min(10)
      .max(10)
      .required(),
    password: Joi.string()
      .min(6)
      .max(20)
      .required(),
    categoryId: Joi.objectId().required()
  };
  return Joi.validate(freelancer, schema);
}

module.exports.Freelancer = Freelancer;
module.exports.validate = validateFreelancer;
