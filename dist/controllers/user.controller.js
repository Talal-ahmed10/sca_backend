"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.avatarURL = exports.avatarUploadURL = exports.getOne = void 0;
const app_constants_1 = require("../app_constants");
const errors_1 = require("../messages/errors");
const statusCodes_1 = require("../messages/statusCodes");
const success_1 = require("../messages/success");
const s3_1 = require("../utils/aws/s3");
const helper_1 = require("../utils/helper");
const user_validation_1 = require("../validation/user.validation");
const getOne = async (req, res) => {
    try {
        res.status(statusCodes_1.STATUS.success).send({ data: req.body.user, message: success_1.SUCCESS.fetched });
    }
    catch (error) {
        (0, helper_1.errorLogs)('get_one', error);
        res.status(statusCodes_1.STATUS.server).send({ error: error, message: errors_1.ERRORS.server_error });
    }
};
exports.getOne = getOne;
const avatarUploadURL = async (req, res) => {
    try {
        const { user } = req.body;
        const KEY = `${user._id}.png`;
        const url = await (0, s3_1.getUploadImageURL)(app_constants_1.BUCKET, app_constants_1.USER_DIR, KEY);
        const avatar = (0, s3_1.getImageURL)(app_constants_1.USER_DIR, KEY);
        res.status(statusCodes_1.STATUS.success).send({ data: { avatar, key: KEY, url }, message: success_1.SUCCESS.fetched });
    }
    catch (error) {
        (0, helper_1.errorLogs)('update_user', error);
        res.status(statusCodes_1.STATUS.server).send({ error: error, message: errors_1.ERRORS.server_error });
    }
};
exports.avatarUploadURL = avatarUploadURL;
const avatarURL = async (req, res) => {
    try {
        const { isValidated, status, message } = (0, user_validation_1.validateAvatarURL)(req.body);
        if (!isValidated)
            return res.status(status).send({ message });
        const { key } = req.body;
        const avatar = (0, s3_1.getImageURL)(app_constants_1.USER_DIR, key);
        return res.status(statusCodes_1.STATUS.success).send({ data: { avatar }, message: success_1.SUCCESS.fetched });
    }
    catch (error) {
        (0, helper_1.errorLogs)('update_user', error);
        return res.status(statusCodes_1.STATUS.server).send({ error: error, message: errors_1.ERRORS.server_error });
    }
};
exports.avatarURL = avatarURL;
const update = async (req, res) => {
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
            return res.status(statusCodes_1.STATUS.badRequest).send({ message: errors_1.ERRORS.cannot_update });
        }
        const user = req.body.user;
        updates.forEach((update) => {
            user[update] = req.body[update];
        });
        await user.save();
        return res.status(statusCodes_1.STATUS.success).send({ data: user, message: success_1.SUCCESS.updated });
    }
    catch (error) {
        (0, helper_1.errorLogs)('update_user', error);
        return res.status(statusCodes_1.STATUS.server).send({ error: error, message: errors_1.ERRORS.server_error });
    }
};
exports.update = update;
const remove = async (req, res) => {
    try {
    }
    catch (error) {
        (0, helper_1.errorLogs)('remove_user', error);
        res.status(statusCodes_1.STATUS.server).send({ error: error, message: errors_1.ERRORS.server_error });
    }
};
exports.remove = remove;
//# sourceMappingURL=user.controller.js.map