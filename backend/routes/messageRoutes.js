import express from "express";
import {
  sendMessage,
  getConversation,
  getInbox,
  markAsSeen,
  deleteMessage,
  editMessage
} from "../controllers/messageController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Get inbox (list of people you have chatted with)
router.get("/inbox", auth, getInbox);

// Get conversation with a specific user
router.get("/:receiverId", auth, getConversation);

// Send a new message
router.post("/:receiverId", auth, sendMessage);

// Mark messages as seen
router.post("/seen/:senderId", auth, markAsSeen);

// Edit a message
router.put("/edit/:messageId", auth, editMessage);

// Delete a message
router.delete("/:messageId", auth, deleteMessage);

export default router;
