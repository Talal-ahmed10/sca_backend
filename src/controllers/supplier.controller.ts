import express from 'express';
import { errorLogs } from '../utils/helper';
import { ERRORS } from '../messages/errors';
import { STATUS } from '../messages/statusCodes';
import { Supplier, getSupplierByEmail } from '../models/supplier.model';

export const becomeASupplierRegisteration = async (req: express.Request, res: express.Response) => {
    try {
        const { first_name, last_name, email, category } = req.body;

        const alreadyExist = await getSupplierByEmail(email);
        if (alreadyExist) return res.status(STATUS.badRequest).send({ message: ERRORS.email_exist });

        const supplierData = await Supplier.create({ first_name, last_name, email, category });

        return res.status(STATUS.created).send({ data: supplierData, message: STATUS.created });
    } catch (error: any | unknown) {
        errorLogs('become_a_supplier', error);
        return res.status(STATUS.server).send({ error: error, message: ERRORS.server_error });
    }
};
