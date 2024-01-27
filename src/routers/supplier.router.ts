import express from 'express';
import { becomeASupplierRegisteration } from '../controllers/supplier.controller';

const router = express.Router();
router.post('/register-supplier', becomeASupplierRegisteration);

module.exports = router;
