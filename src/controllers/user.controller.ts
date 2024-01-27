import express from 'express';
import { BUCKET, USER_DIR } from '../app_constants';
import { ERRORS } from '../messages/errors';
import { STATUS } from '../messages/statusCodes';
import { SUCCESS } from '../messages/success';
import { getImageURL, getUploadImageURL } from '../utils/aws/s3';
import { errorLogs } from '../utils/helper';
import { validateAvatarURL } from '../validation/user.validation';

export const getOne = async (req: express.Request, res: express.Response) => {
    try {
        res.status(STATUS.success).send({ data: req.body.user, message: SUCCESS.fetched });
    } catch (error: any | unknown) {
        errorLogs('get_one', error);
        res.status(STATUS.server).send({ error: error, message: ERRORS.server_error });
    }
};

export const avatarUploadURL = async (req: express.Request, res: express.Response) => {
    try {
        const { user } = req.body;

        const KEY = `${user._id}.png`;
        const url = await getUploadImageURL(BUCKET, USER_DIR, KEY);
        const avatar = getImageURL(USER_DIR, KEY);

        res.status(STATUS.success).send({ data: { avatar, key: KEY, url }, message: SUCCESS.fetched });
    } catch (error: any | unknown) {
        errorLogs('update_user', error);
        res.status(STATUS.server).send({ error: error, message: ERRORS.server_error });
    }
};

export const avatarURL = async (req: express.Request, res: express.Response) => {
    try {
        const { isValidated, status, message } = validateAvatarURL(req.body);
        if (!isValidated) return res.status(status).send({ message });

        const { key } = req.body;

        const avatar = getImageURL(USER_DIR, key);

        return res.status(STATUS.success).send({ data: { avatar }, message: SUCCESS.fetched });
    } catch (error: any | unknown) {
        errorLogs('update_user', error);
        return res.status(STATUS.server).send({ error: error, message: ERRORS.server_error });
    }
};

export const update = async (req: express.Request, res: express.Response) => {
    try {
        let updates = Object.keys(req.body);
        const allowedUpdates = [
            'first_name',
            'last_name',
            'avatar',
            'notification',
            'gender',
            'weight',
            'height',
            'fat',
        ];

        updates = updates.filter((update) => allowedUpdates.includes(update));

        if (updates.length === 0) {
            return res.status(STATUS.badRequest).send({ message: ERRORS.cannot_update });
        }

        const user = req.body.user;

        updates.forEach((update) => {
            user[update] = req.body[update];
        });

        await user.save();

        return res.status(STATUS.success).send({ data: user, message: SUCCESS.updated });
    } catch (error: unknown | any) {
        errorLogs('update_user', error);
        return res.status(STATUS.server).send({ error: error, message: ERRORS.server_error });
    }
};

export const remove = async (req: express.Request, res: express.Response) => {
    try {
        // const user = await deleteUserById(req.body.user._id);
        // if (user?.avatar) {
        //   await removeFileFromS3(USER_DIR, user.avatar);
        // }
        // return res
        //   .status(STATUS.success)
        //   .send({ data: { _id: user?.id }, message: SUCCESS.deleted });
    } catch (error: any | unknown) {
        errorLogs('remove_user', error);
        res.status(STATUS.server).send({ error: error, message: ERRORS.server_error });
    }
};
