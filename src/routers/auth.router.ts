import express from "express";
import {
  changedEmail,
  changedPassword,
  forgotPassword,
  login,
  logout,
  register,
  resetPassword,
  verifyOTP,
  deleteAccount,
  resendOTP,
} from "../controllers/auth.controller";
import { userAuth } from "../middleware/userAuth";
import {
  validateEmail,
  validateLogin,
  validateRegister,
  validateResetPassword,
  validateVerifyOTP,
  validateChangedPassword,
  validateNewEmail,
  validateDelAcc,
  validateResendOTP,
} from "../validation/auth.validation";
const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/verify-otp", validateVerifyOTP, verifyOTP);
router.post("/resend-otp", validateResendOTP, resendOTP);
router.post("/forgot-password", validateEmail, forgotPassword);
router.patch("/reset-password", validateResetPassword, resetPassword);
router.patch(
  "/changed-password",
  userAuth,
  validateChangedPassword,
  changedPassword
);
router.patch("/changed-email", userAuth, validateNewEmail, changedEmail);
router.post("/logout", userAuth, logout);
router.delete("/delete-account", userAuth, validateDelAcc, deleteAccount);

module.exports = router;
