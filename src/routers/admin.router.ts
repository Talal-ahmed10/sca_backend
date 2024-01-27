import express from "express";
import {
  avatarURL,
  avatarUploadURL,
  blockAdmin,
  blockUser,
  changedPasswordAdmin,
  createAdmin,
  getAdmin,
  getAllAdmins,
  getAllUsers,
  getUser,
  loginAdmin,
  removeAdmin,
  updateAdmin,
  logout,
  logoutAll,
  logoutUser,
} from "../controllers/admin.controller";
import { adminAuth } from "../middleware/adminAuth";
import { superAdminAuth } from "../middleware/superAdminAuth";
import { validateCreateAdmin } from "../validation/admin.validation";

const router = express.Router();

// Admin
router.get("/user", adminAuth, getAllUsers);
router.get("/user/:id", adminAuth, getUser);
router.patch("/user/block/:id", adminAuth, blockUser);
router.patch("/logout-all-user/:id", adminAuth, logoutUser);

router.post("/login", loginAdmin);
router.patch("/", adminAuth, updateAdmin);
router.patch("/changed-password", adminAuth, changedPasswordAdmin);
router.get("/avatar-upload-url", adminAuth, avatarUploadURL);
router.get("/avatar-url", adminAuth, avatarURL);
router.post("/logout", adminAuth, logout);

// Super Admin
router.post("/", superAdminAuth, validateCreateAdmin, createAdmin);
router.get("/", superAdminAuth, getAllAdmins);
router.get("/:id", superAdminAuth, getAdmin);
router.patch("/block/:id", superAdminAuth, blockAdmin);
router.delete("/remove/:id", superAdminAuth, removeAdmin);
router.patch("/logout-all-admin/:id", superAdminAuth, logoutAll);

module.exports = router;
