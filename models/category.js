const mongoose = require("mongoose");
const Joi = require("joi");

const categorySchema = new mongoose.Schema({
  title: { type: String, trim: true, required: true }
});

const Category = mongoose.model("Category", categorySchema);

function validateCategory(category) {
  const schema = {
    title: Joi.string()
      .trim()
      .required()
  };
  return Joi.validate(category, schema);
}

module.exports.categorySchema = categorySchema;
module.exports.Category = Category;
module.exports.validate = validateCategory;
