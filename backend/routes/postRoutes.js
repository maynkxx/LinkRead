import express from "express";
import auth from "../middleware/auth.js";
import upload from "../middleware/upload.js";

import {
  createPost,
  getPostById,
  getAllPosts,
  getPostsByThread,
  updatePost,
  deletePost,
  likePost,
  savePost,
  unsavePost,
  reportPost,
  searchPosts
} from "../controllers/postController.js";

const router = express.Router();

/**
 * GET ROUTES
 */

// Get all posts (main feed)
router.get("/", getAllPosts);

// Get posts inside a specific thread/subthread
router.get("/thread/:threadId", getPostsByThread);

// Get a single post by ID
router.get("/:postId", getPostById);

// Search posts
router.get("/search/query", searchPosts);

/**
 * POST ROUTES
 */

// Create a new post (image/video optional)
router.post(
  "/",
  auth,
  upload.single("media"), // Handles media upload
  createPost
);

// Like / unlike post
router.post("/like/:postId", auth, likePost);

// Save post
router.post("/save/:postId", auth, savePost);

// Unsave post
router.post("/unsave/:postId", auth, unsavePost);

// Report post
router.post("/report/:postId", auth, reportPost);

/**
 * PUT ROUTES
 */

// Edit post (media optional)
router.put(
  "/:postId",
  auth,
  upload.single("media"),
  updatePost
);

/**
 * DELETE ROUTES
 */

// Delete a post
router.delete("/:postId", auth, deletePost);

export default router;
