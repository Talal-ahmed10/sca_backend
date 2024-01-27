"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getThresholdInventory = exports.deleteInventory = exports.updateInventory = exports.getAllInventory = exports.uploadCsv = void 0;
const inventory_model_1 = require("../models/inventory.model");
const helper_1 = require("../utils/helper");
const statusCodes_1 = require("../messages/statusCodes");
const errors_1 = require("../messages/errors");
const success_1 = require("../messages/success");
const uploadCsv = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }
        const csvContent = req.file.buffer.toString();
        console.log(csvContent);
        const parsedData = csvContent
            .split('\n')
            .slice(1)
            .map((row) => row.split(',').map((value) => value.trim()))
            .filter((row) => row[0] !== '' && row.length === 5)
            .map(([inventory_name, incoming, on_hand, committed, fulfillable]) => ({
            inventory_name,
            incoming: parseInt(incoming),
            on_hand: parseInt(on_hand),
            committed: parseInt(committed),
            fulfillable: parseInt(fulfillable),
        }));
        console.log(parsedData);
        await inventory_model_1.Inventory.insertMany(parsedData);
        return res.status(200).json({ message: 'Data uploaded successfully' });
    }
    catch (error) {
        (0, helper_1.errorLogs)('upload_csv', error);
        return res.status(statusCodes_1.STATUS.server).send({ error: error, message: errors_1.ERRORS.server_error });
    }
};
exports.uploadCsv = uploadCsv;
const getAllInventory = async (req, res) => {
    try {
        const inventoryData = await inventory_model_1.Inventory.find().select('_id inventory_name incoming on_hand committed fulfillable');
        if (!inventoryData)
            return res.status(statusCodes_1.STATUS.badRequest).send({ message: errors_1.ERRORS.not_found });
        return res
            .status(statusCodes_1.STATUS.success)
            .send({ data: { inventoryData, status: 'success', message: success_1.SUCCESS.fetched } });
    }
    catch (error) {
        (0, helper_1.errorLogs)('get_all_inventory', error);
        return res.status(statusCodes_1.STATUS.server).send({ error: error, message: errors_1.ERRORS.server_error });
    }
};
exports.getAllInventory = getAllInventory;
const updateInventory = async (req, res) => {
    try {
        const inventoryId = req.params.id;
        const updates = Object.keys(req.body);
        const allowedUpdates = ['inventory_name', 'incoming', 'on_hand', 'committed', 'fulfillable'];
        const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));
        if (!isValidUpdate)
            return res.status(statusCodes_1.STATUS.badRequest).send({ message: errors_1.ERRORS.cannot_update });
        const inventoryData = await inventory_model_1.Inventory.findById(inventoryId);
        if (!inventoryData)
            return res.status(statusCodes_1.STATUS.notFound).send({ message: errors_1.ERRORS.not_found });
        updates.forEach((update) => {
            inventoryData[update] = req.body[update];
        });
        await inventoryData.save();
        return res.status(statusCodes_1.STATUS.success).send({ data: inventoryData, message: success_1.SUCCESS.updated });
    }
    catch (error) {
        (0, helper_1.errorLogs)('update_inventory', error);
        return res.status(statusCodes_1.STATUS.server).send({ error: error, message: errors_1.ERRORS.server_error });
    }
};
exports.updateInventory = updateInventory;
const deleteInventory = async (req, res) => {
    try {
        const inventoryId = req.params.id;
        const deletedInventory = await inventory_model_1.Inventory.findByIdAndDelete(inventoryId);
        if (!deletedInventory)
            return res.status(statusCodes_1.STATUS.notFound).send({ message: errors_1.ERRORS.not_found });
        return res.status(statusCodes_1.STATUS.success).send({ data: exports.deleteInventory, message: success_1.SUCCESS.deleted });
    }
    catch (error) {
        (0, helper_1.errorLogs)('delete_inventory', error);
        return res.status(statusCodes_1.STATUS.server).send({ error: error, message: errors_1.ERRORS.server_error });
    }
};
exports.deleteInventory = deleteInventory;
const getThresholdInventory = async (req, res) => {
    try {
        const thresholdData = await inventory_model_1.Inventory.aggregate([
            {
                $match: {
                    on_hand: { $lt: 10 },
                },
            },
        ]);
        if (!thresholdData.length)
            return res.status(statusCodes_1.STATUS.notFound).send({ message: errors_1.ERRORS.not_found });
        return res.status(statusCodes_1.STATUS.success).send({ data: thresholdData, message: success_1.SUCCESS.fetched });
    }
    catch (error) {
        (0, helper_1.errorLogs)('threshold_inventory', error);
        return res.status(statusCodes_1.STATUS.server).send({ error: error, message: errors_1.ERRORS.server_error });
    }
};
exports.getThresholdInventory = getThresholdInventory;
//# sourceMappingURL=inventory.controller.js.map