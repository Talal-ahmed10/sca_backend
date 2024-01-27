"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const userAuth_1 = require("../middleware/userAuth");
const user_validation_1 = require("../validation/user.validation");
const router = express_1.default.Router();
router.get("/", userAuth_1.userAuth, user_controller_1.getOne);
router.get("/avatar-upload-url", userAuth_1.userAuth, user_controller_1.avatarUploadURL);
router.get("/avatar-url", userAuth_1.userAuth, user_controller_1.avatarURL);
router.patch("/", userAuth_1.userAuth, user_validation_1.validateUpdate, user_controller_1.update);
router.delete("/", userAuth_1.userAuth, user_controller_1.remove);
module.exports = router;
//# sourceMappingURL=user.router.js.map