const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  getUserPosts,
  getUserComments,
  searchUsers
} = require("../controllers/userController");
const { protect } = require("../middleware/auth");

router.get("/search", searchUsers);
router.get("/:userId", getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.get("/posts/:userId", getUserPosts);
router.get("/comments/:userId", getUserComments);

module.exports = router;