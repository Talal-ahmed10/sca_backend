"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAccount = exports.logout = exports.changedEmail = exports.changedPassword = exports.resetPassword = exports.forgotPassword = exports.resendOTP = exports.verifyOTP = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const errors_1 = require("../messages/errors");
const statusCodes_1 = require("../messages/statusCodes");
const success_1 = require("../messages/success");
const user_model_1 = require("../models/user.model");
const helper_1 = require("../utils/helper");
const register = async (req, res) => {
    try {
        const { email } = req.body;
        const alreadyExist = await (0, user_model_1.getUserByEmail)(email);
        if (alreadyExist)
            return res
                .status(statusCodes_1.STATUS.badRequest)
                .send({ message: errors_1.ERRORS.email_exist });
        const userData = Object.assign(Object.assign({}, req.body), { provider: "default", role: "user" });
        const user = await new user_model_1.User(userData).save();
        await user.generateAndSendOTP("authentication", email);
        return res.status(statusCodes_1.STATUS.created).send({ message: success_1.SUCCESS.otp_send });
    }
    catch (error) {
        (0, helper_1.errorLogs)("register", error);
        return res
            .status(statusCodes_1.STATUS.server)
            .send({ error: error, message: errors_1.ERRORS.server_error });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await user_model_1.User.findByCredentials(email, password);
        if (!user)
            return res
                .status(statusCodes_1.STATUS.badRequest)
                .send({ message: errors_1.ERRORS.wrong_credentials });
        if (user["is_blocked"] === true) {
            return res
                .status(statusCodes_1.STATUS.forbidden)
                .send({ data: user, message: errors_1.ERRORS.blocked });
        }
        if (user.is_email_verified === false)
            return res.status(statusCodes_1.STATUS.success).send({
                data: { is_email_verified: user.is_email_verified },
                message: success_1.SUCCESS.otp_send,
            });
        return res
            .status(statusCodes_1.STATUS.success)
            .send({ data: user, token, message: success_1.SUCCESS.login });
    }
    catch (error) {
        (0, helper_1.errorLogs)("login", error);
        return res
            .status(statusCodes_1.STATUS.server)
            .send({ error: error, message: errors_1.ERRORS.server_error });
    }
};
exports.login = login;
const verifyOTP = async (req, res) => {
    try {
        const { otp, email, type } = req.body;
        const user = await (0, user_model_1.getUserByEmail)(email);
        if (!user) {
            return res
                .status(statusCodes_1.STATUS.badRequest)
                .send({ message: errors_1.ERRORS.email_not_exist });
        }
        const isValidOTP = await user.verifyOTP(otp);
        if (isValidOTP === false)
            return res
                .status(statusCodes_1.STATUS.badRequest)
                .send({ message: errors_1.ERRORS.invalid_otp });
        if (user.otp.otp_type !== type)
            return res
                .status(statusCodes_1.STATUS.badRequest)
                .send({ message: errors_1.ERRORS.invalid_otp_type });
        if (type === "reset_password") {
            user["otp"] = Object.assign(Object.assign({}, user.otp), { verified: true, otp_type: "none" });
            await user.save();
            return res.status(statusCodes_1.STATUS.success).send({ message: success_1.SUCCESS.verified });
        }
        if (type === "changed_email") {
            user["email"] = user["temp_email"];
            user["temp_email"] = "";
            user["otp"] = { text: "", expiry: "", verified: false, otp_type: "none" };
            await user.save();
            return res.status(statusCodes_1.STATUS.success).send({ message: success_1.SUCCESS.chg_email });
        }
        const token = await user.generateAccessToken();
        user["otp"] = { text: "", expiry: "", verified: false, otp_type: "none" };
        user["is_email_verified"] = true;
        await user.save();
        console.log(user.otp);
        return res
            .status(statusCodes_1.STATUS.success)
            .send({ data: user, token, message: success_1.SUCCESS.verified });
    }
    catch (error) {
        (0, helper_1.errorLogs)("verify_otp", error);
        return res
            .status(statusCodes_1.STATUS.server)
            .send({ error: error, message: errors_1.ERRORS.server_error });
    }
};
exports.verifyOTP = verifyOTP;
const resendOTP = async (req, res) => {
    try {
        const { email, type } = req.body;
        const user = await (0, user_model_1.getUserByEmail)(email);
        if (!user) {
            return res
                .status(statusCodes_1.STATUS.badRequest)
                .send({ message: errors_1.ERRORS.email_not_exist });
        }
        console.log(user.otp.otp_type);
        if (user.otp.otp_type !== type)
            return res
                .status(statusCodes_1.STATUS.badRequest)
                .send({ message: errors_1.ERRORS.invalid_otp_type });
        await user.generateAndSendOTP(type, email);
        return res.status(statusCodes_1.STATUS.success).send({ message: success_1.SUCCESS.otp_send });
    }
    catch (error) {
        (0, helper_1.errorLogs)("resend_otp", error);
        return res
            .status(statusCodes_1.STATUS.server)
            .send({ error: error, message: errors_1.ERRORS.server_error });
    }
};
exports.resendOTP = resendOTP;
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await (0, user_model_1.getUserByEmail)(email);
        if (!user)
            return res
                .status(statusCodes_1.STATUS.badRequest)
                .send({ message: errors_1.ERRORS.email_not_exist });
        await user.generateAndSendOTP("reset_password", email);
        return res.status(statusCodes_1.STATUS.success).send({ message: success_1.SUCCESS.otp_send });
    }
    catch (error) {
        (0, helper_1.errorLogs)("forgot_password", error);
        return res
            .status(statusCodes_1.STATUS.server)
            .send({ error: error, message: errors_1.ERRORS.server_error });
    }
};
exports.forgotPassword = forgotPassword;
const resetPassword = async (req, res) => {
    try {
        const { email = "", new_password = "" } = req.body;
        const user = await (0, user_model_1.getUserByEmail)(email);
        if (!user)
            return res
                .status(statusCodes_1.STATUS.badRequest)
                .send({ message: errors_1.ERRORS.email_not_exist });
        if (user.otp.verified === false)
            return res
                .status(statusCodes_1.STATUS.badRequest)
                .send({ message: errors_1.ERRORS.please_verify_otp });
        user["otp"] = { text: "", expiry: "", verified: false, otp_type: "none" };
        user["password"] = new_password;
        await user.save();
        return res.status(statusCodes_1.STATUS.success).send({ message: success_1.SUCCESS.reset_pwd });
    }
    catch (error) {
        (0, helper_1.errorLogs)("reset_password", error);
        return res
            .status(statusCodes_1.STATUS.server)
            .send({ error: error, message: errors_1.ERRORS.server_error });
    }
};
exports.resetPassword = resetPassword;
const changedPassword = async (req, res) => {
    try {
        const { current_password, new_password, user } = req.body;
        const isMatch = await bcryptjs_1.default.compare(current_password, user.password);
        if (!isMatch)
            return res
                .status(statusCodes_1.STATUS.badRequest)
                .send({ message: errors_1.ERRORS.invalid_curr_pwd });
        user["password"] = new_password;
        await user.save();
        return res.status(statusCodes_1.STATUS.success).send({ message: success_1.SUCCESS.chg_pwd });
    }
    catch (error) {
        (0, helper_1.errorLogs)("changed_password", error);
        return res
            .status(statusCodes_1.STATUS.server)
            .send({ error: error, message: errors_1.ERRORS.server_error });
    }
};
exports.changedPassword = changedPassword;
const changedEmail = async (req, res) => {
    try {
        const { new_email, user } = req.body;
        await user.generateAndSendOTP("changed_email", new_email);
        user["temp_email"] = new_email;
        user.save();
        return res.status(statusCodes_1.STATUS.success).send({ message: success_1.SUCCESS.otp_send });
    }
    catch (error) {
        (0, helper_1.errorLogs)("changed_email", error);
        return res
            .status(statusCodes_1.STATUS.server)
            .send({ error: error, message: errors_1.ERRORS.server_error });
    }
};
exports.changedEmail = changedEmail;
const logout = async (req, res) => {
    try {
        const { user, access_token } = req.body;
        user.tokens = user.tokens.filter((token) => token.access_token !== access_token);
        await user.save();
        res.status(statusCodes_1.STATUS.success).send({ message: success_1.SUCCESS.logout });
    }
    catch (error) {
        (0, helper_1.errorLogs)("logout", error);
        res
            .status(statusCodes_1.STATUS.server)
            .send({ error: error, message: errors_1.ERRORS.server_error });
    }
};
exports.logout = logout;
const deleteAccount = async (req, res) => {
    try {
        const { user, current_password } = req.body;
        const isMatch = await bcryptjs_1.default.compare(current_password, user.password);
        if (!isMatch)
            return res
                .status(statusCodes_1.STATUS.badRequest)
                .send({ message: errors_1.ERRORS.invalid_curr_pwd });
        await (0, user_model_1.deleteUserById)(user._id);
        return res
            .status(statusCodes_1.STATUS.success)
            .send({ data: { _id: user._id }, message: success_1.SUCCESS.deleted });
    }
    catch (error) {
        (0, helper_1.errorLogs)("logout", error);
        return res
            .status(statusCodes_1.STATUS.server)
            .send({ error: error, message: errors_1.ERRORS.server_error });
    }
};
exports.deleteAccount = deleteAccount;
//# sourceMappingURL=auth.controller.js.map