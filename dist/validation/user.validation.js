"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAvatarURL = exports.validateAvatarUploadURL = exports.validateUpdate = void 0;
const errors_1 = require("../messages/errors");
const statusCodes_1 = require("../messages/statusCodes");
const validateUpdate = (req, res, next) => {
    try {
        if (Object.keys(req.body).length < 3) {
            throw new Error(errors_1.ERRORS.pro_at_least_one_field);
        }
        next();
    }
    catch (error) {
        console.log(error);
        res.status(statusCodes_1.STATUS.badRequest).send({ message: error.message });
    }
};
exports.validateUpdate = validateUpdate;
const validateAvatarUploadURL = ({ file_type = "", }) => {
    if (!file_type.trim())
        return {
            isValidated: false,
            status: statusCodes_1.STATUS.badRequest,
            message: errors_1.ERRORS.file_type,
        };
    return { isValidated: true, status: statusCodes_1.STATUS.success, message: "" };
};
exports.validateAvatarUploadURL = validateAvatarUploadURL;
const validateAvatarURL = ({ key = "", }) => {
    if (!key.trim())
        return {
            isValidated: false,
            status: statusCodes_1.STATUS.badRequest,
            message: errors_1.ERRORS.key,
        };
    return { isValidated: true, status: statusCodes_1.STATUS.success, message: "" };
};
exports.validateAvatarURL = validateAvatarURL;
//# sourceMappingURL=user.validation.js.map