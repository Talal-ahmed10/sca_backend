"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("../controllers/admin.controller");
const adminAuth_1 = require("../middleware/adminAuth");
const superAdminAuth_1 = require("../middleware/superAdminAuth");
const admin_validation_1 = require("../validation/admin.validation");
const router = express_1.default.Router();
router.get("/user", adminAuth_1.adminAuth, admin_controller_1.getAllUsers);
router.get("/user/:id", adminAuth_1.adminAuth, admin_controller_1.getUser);
router.patch("/user/block/:id", adminAuth_1.adminAuth, admin_controller_1.blockUser);
router.patch("/logout-all-user/:id", adminAuth_1.adminAuth, admin_controller_1.logoutUser);
router.post("/login", admin_controller_1.loginAdmin);
router.patch("/", adminAuth_1.adminAuth, admin_controller_1.updateAdmin);
router.patch("/changed-password", adminAuth_1.adminAuth, admin_controller_1.changedPasswordAdmin);
router.get("/avatar-upload-url", adminAuth_1.adminAuth, admin_controller_1.avatarUploadURL);
router.get("/avatar-url", adminAuth_1.adminAuth, admin_controller_1.avatarURL);
router.post("/logout", adminAuth_1.adminAuth, admin_controller_1.logout);
router.post("/", superAdminAuth_1.superAdminAuth, admin_validation_1.validateCreateAdmin, admin_controller_1.createAdmin);
router.get("/", superAdminAuth_1.superAdminAuth, admin_controller_1.getAllAdmins);
router.get("/:id", superAdminAuth_1.superAdminAuth, admin_controller_1.getAdmin);
router.patch("/block/:id", superAdminAuth_1.superAdminAuth, admin_controller_1.blockAdmin);
router.delete("/remove/:id", superAdminAuth_1.superAdminAuth, admin_controller_1.removeAdmin);
router.patch("/logout-all-admin/:id", superAdminAuth_1.superAdminAuth, admin_controller_1.logoutAll);
module.exports = router;
//# sourceMappingURL=admin.router.js.map