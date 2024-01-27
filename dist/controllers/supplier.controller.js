"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.becomeASupplierRegisteration = void 0;
const helper_1 = require("../utils/helper");
const errors_1 = require("../messages/errors");
const statusCodes_1 = require("../messages/statusCodes");
const supplier_model_1 = require("../models/supplier.model");
const becomeASupplierRegisteration = async (req, res) => {
    try {
        const { first_name, last_name, email, category } = req.body;
        const alreadyExist = await (0, supplier_model_1.getSupplierByEmail)(email);
        if (alreadyExist)
            return res.status(statusCodes_1.STATUS.badRequest).send({ message: errors_1.ERRORS.email_exist });
        const supplierData = await supplier_model_1.Supplier.create({ first_name, last_name, email, category });
        return res.status(statusCodes_1.STATUS.created).send({ data: supplierData, message: statusCodes_1.STATUS.created });
    }
    catch (error) {
        (0, helper_1.errorLogs)('become_a_supplier', error);
        return res.status(statusCodes_1.STATUS.server).send({ error: error, message: errors_1.ERRORS.server_error });
    }
};
exports.becomeASupplierRegisteration = becomeASupplierRegisteration;
//# sourceMappingURL=supplier.controller.js.map