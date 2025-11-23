const express = require("express");
const auth = require("../middleware/auth");
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
  auth,
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "banner", maxCount: 1 }
  ]),
  updateUserProfile
);

router.delete("/delete/account", auth, deleteUserAccount);

router.post("/follow/:userId", auth, followUser);
router.post("/unfollow/:userId", auth, unfollowUser);

router.get("/saved/posts/list", auth, getSavedPosts);
router.get("/posts/list/:userId", getUserPosts);
router.get("/comments/list/:userId", getUserComments);

module.exports = router;
