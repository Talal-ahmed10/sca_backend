"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const userAuth_1 = require("../middleware/userAuth");
const auth_validation_1 = require("../validation/auth.validation");
const router = express_1.default.Router();
router.post("/register", auth_validation_1.validateRegister, auth_controller_1.register);
router.post("/login", auth_validation_1.validateLogin, auth_controller_1.login);
router.post("/verify-otp", auth_validation_1.validateVerifyOTP, auth_controller_1.verifyOTP);
router.post("/resend-otp", auth_validation_1.validateResendOTP, auth_controller_1.resendOTP);
router.post("/forgot-password", auth_validation_1.validateEmail, auth_controller_1.forgotPassword);
router.patch("/reset-password", auth_validation_1.validateResetPassword, auth_controller_1.resetPassword);
router.patch("/changed-password", userAuth_1.userAuth, auth_validation_1.validateChangedPassword, auth_controller_1.changedPassword);
router.patch("/changed-email", userAuth_1.userAuth, auth_validation_1.validateNewEmail, auth_controller_1.changedEmail);
router.post("/logout", userAuth_1.userAuth, auth_controller_1.logout);
router.delete("/delete-account", userAuth_1.userAuth, auth_validation_1.validateDelAcc, auth_controller_1.deleteAccount);
module.exports = router;
//# sourceMappingURL=auth.router.js.map