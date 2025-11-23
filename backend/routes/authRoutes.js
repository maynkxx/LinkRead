const express = require("express");
const {
  registerUser,
  loginUser,
  getMe,
  verifyEmail,
  resendVerificationEmail,
  forgotPassword,
  resetPassword,
  logoutUser
} = require("../controllers/authController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", auth, logoutUser);
router.get("/me", auth, getMe);
router.get("/verify/:token", verifyEmail);
router.post("/verify/resend", resendVerificationEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
