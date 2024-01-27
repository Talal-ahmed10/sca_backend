"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDelAcc = exports.validateNewEmail = exports.validateChangedPassword = exports.validateResetPassword = exports.validateEmail = exports.validateResendOTP = exports.validateVerifyOTP = exports.validateLogin = exports.validateRegister = void 0;
const mongoose_1 = require("mongoose");
const app_constants_1 = require("../app_constants");
const regex_1 = require("../app_constants/regex");
const errors_1 = require("../messages/errors");
const statusCodes_1 = require("../messages/statusCodes");
const validateRegister = (req, res, next) => {
    try {
        const { email = "", password = "" } = req.body;
        if (regex_1.EMAIL_REGEX.test(email.trim()) === false)
            throw new mongoose_1.Error(errors_1.ERRORS.valid_email);
        if (regex_1.PWD_REGEX.test(password.trim()) === false)
            throw new mongoose_1.Error(errors_1.ERRORS.valid_pwd);
        next();
    }
    catch (error) {
        console.log(error);
        res.status(statusCodes_1.STATUS.badRequest).send({ message: error.message });
    }
};
exports.validateRegister = validateRegister;
const validateLogin = (req, res, next) => {
    try {
        const { email = "", password = "" } = req.body;
        if (!email.trim())
            throw new mongoose_1.Error(errors_1.ERRORS.email);
        if (!password.trim())
            throw new mongoose_1.Error(errors_1.ERRORS.password);
        next();
    }
    catch (error) {
        console.log(error);
        res.status(statusCodes_1.STATUS.badRequest).send({ message: error.message });
    }
};
exports.validateLogin = validateLogin;
const validateVerifyOTP = (req, res, next) => {
    try {
        const { type = "", email = "", otp = "" } = req.body;
        if (app_constants_1.OTP_TYPES.includes(type) === false)
            throw new mongoose_1.Error(errors_1.ERRORS.invalid_otp_type);
        if (!email.trim())
            throw new mongoose_1.Error(errors_1.ERRORS.email);
        if (!otp.trim())
            throw new mongoose_1.Error(errors_1.ERRORS.otp);
        next();
    }
    catch (error) {
        console.log(error);
        res.status(statusCodes_1.STATUS.badRequest).send({ message: error.message });
    }
};
exports.validateVerifyOTP = validateVerifyOTP;
const validateResendOTP = (req, res, next) => {
    try {
        const { type, email } = req.body;
        if (app_constants_1.OTP_TYPES.includes(type) === false)
            throw new mongoose_1.Error(errors_1.ERRORS.invalid_otp_type);
        if (!email.trim())
            throw new mongoose_1.Error(errors_1.ERRORS.email);
        next();
    }
    catch (error) {
        console.log(error);
        res.status(statusCodes_1.STATUS.badRequest).send({ message: error.message });
    }
};
exports.validateResendOTP = validateResendOTP;
const validateEmail = (req, res, next) => {
    try {
        const { email = "" } = req.body;
        if (!email.trim())
            throw new mongoose_1.Error(errors_1.ERRORS.email);
        next();
    }
    catch (error) {
        res.status(statusCodes_1.STATUS.badRequest).send({ message: error.message });
    }
};
exports.validateEmail = validateEmail;
const validateResetPassword = (req, res, next) => {
    try {
        const { email = "", new_password = "" } = req.body;
        if (!email.trim())
            throw new mongoose_1.Error(errors_1.ERRORS.email);
        if (regex_1.PWD_REGEX.test(new_password.trim()) === false)
            throw new mongoose_1.Error(errors_1.ERRORS.valid_new_pwd);
        next();
    }
    catch (error) {
        res.status(statusCodes_1.STATUS.badRequest).send({ message: error.message });
    }
};
exports.validateResetPassword = validateResetPassword;
const validateChangedPassword = (req, res, next) => {
    try {
        const { current_password = "", new_password = "" } = req.body;
        if (!current_password.trim())
            throw new mongoose_1.Error(errors_1.ERRORS.pro_curr_pwd);
        if (regex_1.PWD_REGEX.test(new_password.trim()) === false)
            throw new mongoose_1.Error(errors_1.ERRORS.valid_new_pwd);
        next();
    }
    catch (error) {
        res.status(statusCodes_1.STATUS.badRequest).send({ message: error.message });
    }
};
exports.validateChangedPassword = validateChangedPassword;
const validateNewEmail = (req, res, next) => {
    try {
        const { new_email = "" } = req.body;
        if (!new_email.trim())
            throw new mongoose_1.Error(errors_1.ERRORS.email);
        next();
    }
    catch (error) {
        res.status(statusCodes_1.STATUS.badRequest).send({ message: error.message });
    }
};
exports.validateNewEmail = validateNewEmail;
const validateDelAcc = (req, res, next) => {
    try {
        const { current_password = "" } = req.body;
        if (!current_password.trim())
            throw new mongoose_1.Error(errors_1.ERRORS.pro_curr_pwd);
        next();
    }
    catch (error) {
        res.status(statusCodes_1.STATUS.badRequest).send({ message: error.message });
    }
};
exports.validateDelAcc = validateDelAcc;
//# sourceMappingURL=auth.validation.js.map