import express from 'express';
import multer from 'multer';
import {
    deleteInventory,
    getAllInventory,
    getThresholdInventory,
    updateInventory,
    uploadCsv,
} from '../controllers/inventory.controller';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.get('/', getAllInventory);
router.patch('/update/:id', updateInventory);
router.delete('/delete/:id', deleteInventory);
router.get('/threshold-inventory', getThresholdInventory);
router.post('/upload-csv', upload.single('csvFile'), uploadCsv);

module.exports = router;
