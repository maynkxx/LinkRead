const express = require("express");
const authenticate = require("../middleware/auth");
const upload = require("../middleware/upload");

const {
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
  followUser,
  unfollowUser,
  getSavedPosts,
  getUserPosts,
  getUserComments,
  searchUsers
} = require("../controllers/userController");

const router = express.Router();

router.get("/:userId", getUserProfile);
router.get("/search/query", searchUsers);

router.put(
  "/update/profile",
  authenticate,
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "banner", maxCount: 1 }
  ]),
  updateUserProfile
);

router.delete("/delete/account", authenticate, deleteUserAccount);

router.post("/follow/:userId", authenticate, followUser);
router.post("/unfollow/:userId", authenticate, unfollowUser);

router.get("/saved/posts/list", authenticate, getSavedPosts);
router.get("/posts/list/:userId", getUserPosts);
router.get("/comments/list/:userId", getUserComments);

module.exports = router;
