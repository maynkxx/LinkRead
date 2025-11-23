const express = require("express");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

const {
  createThread,
  getAllThreads,
  getThreadById,
  updateThread,
  deleteThread,
  joinThread,
  leaveThread,
  searchThreads
} = require("../controllers/threadController");

const router = express.Router();

router.get("/", getAllThreads);
router.get("/:threadId", getThreadById);
router.get("/search/query", searchThreads);

router.post(
  "/",
  auth,
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 }
  ]),
  createThread
);

router.put(
  "/:threadId",
  auth,
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 }
  ]),
  updateThread
);

router.delete("/:threadId", auth, deleteThread);

router.post("/join/:threadId", auth, joinThread);
router.post("/leave/:threadId", auth, leaveThread);

module.exports = router;
