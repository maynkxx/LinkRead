const express = require("express");
const {
  sendMessage,
  getConversation,
  getInbox,
  markAsSeen,
  deleteMessage,
  editMessage
} = require("../controllers/messageController");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/inbox", auth, getInbox);
router.get("/:receiverId", auth, getConversation);
router.post("/:receiverId", auth, sendMessage);
router.post("/seen/:senderId", auth, markAsSeen);
router.put("/edit/:messageId", auth, editMessage);
router.delete("/:messageId", auth, deleteMessage);

module.exports = router;
