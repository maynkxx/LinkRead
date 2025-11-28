const express = require("express");
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getPostById,
  toggleUpvote,
  deletePost
} = require("../controllers/postController");
const { protect } = require("../middleware/auth");

// Public Routes (Anyone can see blogs)
router.get("/", getAllPosts);
router.get("/:id", getPostById);

// Protected Routes (Must be logged in)
router.post("/", protect, createPost);
router.put("/upvote/:id", protect, toggleUpvote);
router.delete("/:id", protect, deletePost);

module.exports = router;