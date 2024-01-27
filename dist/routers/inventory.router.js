"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const inventory_controller_1 = require("../controllers/inventory.controller");
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
const router = express_1.default.Router();
router.get('/', inventory_controller_1.getAllInventory);
router.patch('/update/:id', inventory_controller_1.updateInventory);
router.delete('/delete/:id', inventory_controller_1.deleteInventory);
router.get('/threshold-inventory', inventory_controller_1.getThresholdInventory);
router.post('/upload-csv', upload.single('csvFile'), inventory_controller_1.uploadCsv);
module.exports = router;
//# sourceMappingURL=inventory.router.js.map