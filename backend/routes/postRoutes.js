const express = require("express");
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getPopularPosts,
  getPostById,
  upvotePost,
  downvotePost,
  deletePost
} = require("../controllers/postController");
const { protect } = require("../middleware/auth");

router.get("/", getAllPosts);
router.get("/popular", getPopularPosts);
router.get("/:id", getPostById);
router.post("/", protect, createPost);
router.put("/:id/upvote", protect, upvotePost);
router.put("/:id/downvote", protect, downvotePost);
router.delete("/:id", protect, deletePost);

module.exports = router;