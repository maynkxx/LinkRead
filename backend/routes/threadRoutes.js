const express = require("express");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

const {
  createThread,
  getAllThreads,
  getThread,
  updateThread,
  deleteThread,
  joinThread,
  leaveThread
} = require("../controllers/threadController");

const router = express.Router();

router.get("/", getAllThreads);
router.get("/:threadId", getThread);

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
