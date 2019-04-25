const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Chat, validate } = require("../models/chat");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
let chat;

router.get("/", async (req, res) => {
  const chats = await Chat.find();

  res.send(chats);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  chat = await new Chat({
    sender: req.user.name,
    message: req.body.message
  });
  await chat.save();
  broadcasting();
  return res.send(chat);
});

function broadcasting() {
  io.on("connection", socket => {
    io.sockets.emit("broadcast", {
      content: chat
    });

    socket.on("disconnect", () => {
      io.sockets.emit("broadcast", {
        content: chat.name + "disconnected "
      });
    });
  });
}

module.exports = router;
