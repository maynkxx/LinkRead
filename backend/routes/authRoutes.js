import express from "express";
import {
  registerUser,
  loginUser,
  getMe,
  verifyEmail,
  resendVerificationEmail,
  forgotPassword,
  resetPassword,
  logoutUser
} from "../controllers/authController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Logout
router.post("/logout", auth, logoutUser);

// Get current logged-in user
router.get("/me", auth, getMe);

// Email verification link
router.get("/verify/:token", verifyEmail);

// Resend verification email
router.post("/verify/resend", resendVerificationEmail);

// Forgot password (send reset email)
router.post("/forgot-password", forgotPassword);

// Reset password using token
router.post("/reset-password/:token", resetPassword);

export default router;
