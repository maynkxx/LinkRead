import express from "express";
import auth from "../middleware/auth.js";
import upload from "../middleware/upload.js";

import {
  createThread,
  getAllThreads,
  getThreadById,
  updateThread,
  deleteThread,
  joinThread,
  leaveThread,
  searchThreads
} from "../controllers/threadController.js";

const router = express.Router();

/**
 * PUBLIC ROUTES
 */

// Get all threads
router.get("/", getAllThreads);

// Get thread by ID
router.get("/:threadId", getThreadById);

// Search threads
router.get("/search/query", searchThreads);

/**
 * PROTECTED ROUTES
 */

// Create a new thread (logo/banner optional)
router.post(
  "/",
  auth,
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  createThread
);

// Update thread
router.put(
  "/:threadId",
  auth,
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  updateThread
);

// Delete thread
router.delete("/:threadId", auth, deleteThread);

// Join a thread
router.post("/join/:threadId", auth, joinThread);

// Leave a thread
router.post("/leave/:threadId", auth, leaveThread);

export default router;
