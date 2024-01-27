import express from 'express';
import { Inventory } from '../models/inventory.model';
import { errorLogs } from '../utils/helper';
import { STATUS } from '../messages/statusCodes';
import { ERRORS } from '../messages/errors';
import { SUCCESS } from '../messages/success';

export const uploadCsv = async (req: express.Request, res: express.Response) => {
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
                incoming: parseInt(incoming!),
                on_hand: parseInt(on_hand!),
                committed: parseInt(committed!),
                fulfillable: parseInt(fulfillable!),
            }));
        console.log(parsedData);

        await Inventory.insertMany(parsedData);

        return res.status(200).json({ message: 'Data uploaded successfully' });
    } catch (error: any | unknown) {
        errorLogs('upload_csv', error);
        return res.status(STATUS.server).send({ error: error, message: ERRORS.server_error });
    }
};

export const getAllInventory = async (req: express.Request, res: express.Response) => {
    try {
        const inventoryData = await Inventory.find().select(
            '_id inventory_name incoming on_hand committed fulfillable'
        );

        if (!inventoryData) return res.status(STATUS.badRequest).send({ message: ERRORS.not_found });

        return res
            .status(STATUS.success)
            .send({ data: { inventoryData, status: 'success', message: SUCCESS.fetched } });
    } catch (error: any | unknown) {
        errorLogs('get_all_inventory', error);
        return res.status(STATUS.server).send({ error: error, message: ERRORS.server_error });
    }
};

export const updateInventory = async (req: express.Request, res: express.Response) => {
    try {
        const inventoryId = req.params.id;

        const updates = Object.keys(req.body);
        const allowedUpdates = ['inventory_name', 'incoming', 'on_hand', 'committed', 'fulfillable'];

        const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));

        if (!isValidUpdate) return res.status(STATUS.badRequest).send({ message: ERRORS.cannot_update });

        const inventoryData = await Inventory.findById(inventoryId);

        if (!inventoryData) return res.status(STATUS.notFound).send({ message: ERRORS.not_found });

        updates.forEach((update) => {
            (inventoryData as any)[update] = req.body[update];
        });
        await inventoryData.save();

        return res.status(STATUS.success).send({ data: inventoryData, message: SUCCESS.updated });
    } catch (error: any | unknown) {
        errorLogs('update_inventory', error);
        return res.status(STATUS.server).send({ error: error, message: ERRORS.server_error });
    }
};

export const deleteInventory = async (req: express.Request, res: express.Response) => {
    try {
        const inventoryId = req.params.id;

        const deletedInventory = await Inventory.findByIdAndDelete(inventoryId);

        if (!deletedInventory) return res.status(STATUS.notFound).send({ message: ERRORS.not_found });

        return res.status(STATUS.success).send({ data: deleteInventory, message: SUCCESS.deleted });
    } catch (error: any | unknown) {
        errorLogs('delete_inventory', error);
        return res.status(STATUS.server).send({ error: error, message: ERRORS.server_error });
    }
};

export const getThresholdInventory = async (req: express.Request, res: express.Response) => {
    try {
        const thresholdData = await Inventory.aggregate([
            {
                $match: {
                    on_hand: { $lt: 10 }, // Filter based on on_hand value less than 10
                },
            },
        ]);

        if (!thresholdData.length) return res.status(STATUS.notFound).send({ message: ERRORS.not_found });

        return res.status(STATUS.success).send({ data: thresholdData, message: SUCCESS.fetched });
    } catch (error: any | unknown) {
        errorLogs('threshold_inventory', error);
        return res.status(STATUS.server).send({ error: error, message: ERRORS.server_error });
    }
};
