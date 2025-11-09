import express from "express";
import { signupUser, loginUser, logoutUser, getMe, signupInit, signupVerify, sendOtp, verifyOtp } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/signup-init", signupInit);
router.post("/signup-verify", signupVerify);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", protect, getMe);

export default router;
