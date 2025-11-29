const express = require("express");
const router = express.Router();
const {
  createComment,
  getCommentsByPost,
  deleteComment,
  toggleCommentUpvote
} = require("../controllers/commentController");
const { protect } = require("../middleware/auth");

router.get("/:postId", getCommentsByPost);
router.post("/", protect, createComment);
router.delete("/:commentId", protect, deleteComment);
router.put("/upvote/:commentId", protect, toggleCommentUpvote);

module.exports = router;