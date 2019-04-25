const Joi = require("joi");
const mongoose = require("mongoose");


const chatSchema = new mongoose.Schema({
  sender: { type: String, required: true, minlength: 6, maxlength: 255 },
  message: { type: String, unique: true, required: true }
});

const Chat = mongoose.model("Chat", chatSchema);

function validateChat(chat) {
  const schema = {
    message: Joi.string()
      .min(1)
      .max(255)
  };
  return Joi.validate(chat, schema);
}

module.exports.Chat = Chat;
module.exports.validate = validateChat;
