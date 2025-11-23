const express = require("express");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

const {
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
} = require("../controllers/postController");

const router = express.Router();

router.get("/", getAllPosts);
router.get("/thread/:threadId", getPostsByThread);
router.get("/:postId", getPostById);
router.get("/search/query", searchPosts);

router.post("/", auth, upload.single("media"), createPost);
router.post("/like/:postId", auth, likePost);
router.post("/save/:postId", auth, savePost);
router.post("/unsave/:postId", auth, unsavePost);
router.post("/report/:postId", auth, reportPost);

router.put("/:postId", auth, upload.single("media"), updatePost);

router.delete("/:postId", auth, deletePost);

module.exports = router;
