import express from "express";
import auth from "../middleware/auth.js";
import upload from "../middleware/upload.js";

import {
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
  followUser,
  unfollowUser,
  getSavedPosts,
  getUserPosts,
  getUserComments,
  searchUsers
} from "../controllers/userController.js";

const router = express.Router();

/**
 * PUBLIC ROUTES
 */

// Get user profile by username or ID
router.get("/:userId", getUserProfile);

// Search users by username
router.get("/search/query", searchUsers);

/**
 * PROTECTED ROUTES
 */

// Update user profile (avatar + banner optional)
router.put(
  "/update/profile",
  auth,
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  updateUserProfile
);

// Delete account
router.delete("/delete/account", auth, deleteUserAccount);

// Follow a user
router.post("/follow/:userId", auth, followUser);

// Unfollow a user
router.post("/unfollow/:userId", auth, unfollowUser);

// Get saved posts
router.get("/saved/posts/list", auth, getSavedPosts);

// Get posts created by user
router.get("/posts/list/:userId", getUserPosts);

// Get comments made by user
router.get("/comments/list/:userId", getUserComments);

export default router;
