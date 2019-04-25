const { Freelancer, validate } = require("../models/freelancer");
const { generateSalt } = require("../services/generateSaltServices");
const { Category } = require("../models/category");

async function getAllFreelancers() {
  return (freelancers = await Freelancer.find());
}

function getOneFreelancer() {}

async function addFreelancer(freelancer, category) {
  const newFreelancer = new Freelancer({
    name: freelancer.name,
    bio: freelancer.bio,
    email: freelancer.email,
    phone: freelancer.phone,
    password: freelancer.phone,
    skills: freelancer.skills,
    expertise: freelancer.expertise,
    category: { _id: category._id, title: category.title },
    price: freelancer.price
  });

  newFreelancer.password = await generateSalt(freelancer.password);

  await newFreelancer.save();

  return { _id: newFreelancer._id, name: newFreelancer.name };
}

async function updateFreelancer(freelancer, id, category) {
  const updatedFreelancer = await Freelancer.findByIdAndUpdate(
    id,
    {
      name: freelancer.name,
      email: freelancer.email,
      phone: freelancer.phone,
      password: freelancer.phone,
      category: { _id: category._id, title: category.title }
    },
    { new: true }
  );

  return updatedFreelancer;
}

async function deleteFreelancer(id) {
  return (deletedFreelancer = await Freelancer.findByIdAndRemove(id));
}

async function isExist(email) {
  return await Freelancer.findOne(email);
}

async function getCategory(categoryId) {
  return await Category.findById(categoryId);
}

module.exports.getAllFreelancers = getAllFreelancers;
module.exports.addFreelancer = addFreelancer;
module.exports.updateFreelancer = updateFreelancer;
module.exports.deleteFreelancer = deleteFreelancer;
module.exports.isExist = isExist;
module.exports.getCategory = getCategory;
