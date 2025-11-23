import express from "express";
import {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment,
  likeComment,
  replyToComment,
  getSingleComment
} from "../controllers/commentController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Get comments for a post (thread-style)
router.get("/:postId", getCommentsByPost);

// Get one specific comment
router.get("/single/:commentId", getSingleComment);

// Create a new comment
router.post("/:postId", auth, createComment);

// Reply to a comment
router.post("/reply/:commentId", auth, replyToComment);

// Update a comment
router.put("/:commentId", auth, updateComment);

// Delete a comment
router.delete("/:commentId", auth, deleteComment);

// Like/unlike a comment
router.post("/like/:commentId", auth, likeComment);

export default router;
