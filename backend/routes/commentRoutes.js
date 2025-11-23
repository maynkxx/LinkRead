const express = require("express");
const {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment,
  likeComment,
  replyToComment,
  getSingleComment
} = require("../controllers/commentController");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/:postId", getCommentsByPost);
router.get("/single/:commentId", getSingleComment);
router.post("/:postId", auth, createComment);
router.post("/reply/:commentId", auth, replyToComment);
router.put("/:commentId", auth, updateComment);
router.delete("/:commentId", auth, deleteComment);
router.post("/like/:commentId", auth, likeComment);

module.exports = router;
