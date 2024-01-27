"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const supplier_controller_1 = require("../controllers/supplier.controller");
const router = express_1.default.Router();
router.post('/register-supplier', supplier_controller_1.becomeASupplierRegisteration);
module.exports = router;
//# sourceMappingURL=supplier.router.js.map