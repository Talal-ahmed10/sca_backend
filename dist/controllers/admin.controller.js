"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.updateAdmin = exports.changedPasswordAdmin = exports.loginAdmin = exports.logoutAll = exports.removeAdmin = exports.blockAdmin = exports.getAdmin = exports.getAllAdmins = exports.createAdmin = exports.avatarURL = exports.avatarUploadURL = exports.logoutUser = exports.blockUser = exports.getUser = exports.getAllUsers = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const app_constants_1 = require("../app_constants");
const errors_1 = require("../messages/errors");
const statusCodes_1 = require("../messages/statusCodes");
const success_1 = require("../messages/success");
const admin_model_1 = require("../models/admin.model");
const user_model_1 = require("../models/user.model");
const s3_1 = require("../utils/aws/s3");
const emails_1 = require("../utils/emails");
const helper_1 = require("../utils/helper");
const user_validation_1 = require("../validation/user.validation");
const getAllUsers = async (req, res) => {
    try {
        const users = await (0, user_model_1.getUsers)().select('email first_name last_name is_blocked');
        return res.status(statusCodes_1.STATUS.success).send({ data: users, message: success_1.SUCCESS.fetched });
    }
    catch (error) {
        (0, helper_1.errorLogs)('get_all_users', error);
        return res.status(statusCodes_1.STATUS.server).send({ error: error, message: errors_1.ERRORS.server_error });
    }
};
exports.getAllUsers = getAllUsers;
const getUser = async (req, res) => {
    try {
        const { id = '' } = req.params;
        const user = await (0, user_model_1.getUserById)(id);
        if (!user) {
            return res.status(statusCodes_1.STATUS.notFound).send({ message: errors_1.ERRORS.not_found });
        }
        return res.status(statusCodes_1.STATUS.success).send({ data: user, message: success_1.SUCCESS.fetched });
    }
    catch (error) {
        (0, helper_1.errorLogs)('get_user', error);
        return res.status(statusCodes_1.STATUS.server).send({ error: error, message: errors_1.ERRORS.server_error });
    }
};
exports.getUser = getUser;
const blockUser = async (req, res) => {
    try {
        const { id = '' } = req.params;
        const user = await (0, user_model_1.getUserById)(id);
        if (!user) {
            return res.status(statusCodes_1.STATUS.notFound).send({ message: errors_1.ERRORS.not_found });
        }
        user['is_blocked'] = !user['is_blocked'];
        if (user['is_blocked'] === true) {
            user['tokens'] = [{ access_token: '' }];
        }
        user.save();
        return res.status(statusCodes_1.STATUS.success).send({ data: user, message: success_1.SUCCESS.blocked });
    }
    catch (error) {
        (0, helper_1.errorLogs)('block_user', error);
        return res.status(statusCodes_1.STATUS.server).send({ error: error, message: errors_1.ERRORS.server_error });
    }
};
exports.blockUser = blockUser;
const logoutUser = async (req, res) => {
    try {
        const { id = '' } = req.params;
        const user = await (0, user_model_1.getUserById)(id);
        if (!user)
            return res.status(statusCodes_1.STATUS.notFound).send({ message: errors_1.ERRORS.not_found });
        user.tokens = [];
        user.save();
        return res.status(statusCodes_1.STATUS.noContent).send({ data: {}, message: success_1.SUCCESS.logout });
    }
    catch (error) {
        (0, helper_1.errorLogs)('logout_user', error);
        return res.status(statusCodes_1.STATUS.server).send({ error: error, message: errors_1.ERRORS.server_error });
    }
};
exports.logoutUser = logoutUser;
const avatarUploadURL = async (req, res) => {
    try {
        const { isValidated, status, message } = (0, user_validation_1.validateAvatarUploadURL)(req.body);
        if (!isValidated)
            return res.status(status).send({ message });
        const { file_type, admin } = req.body;
        const KEY = `${admin._id}.${file_type.split('/')[1]}`;
        const url = await (0, s3_1.getUploadImageURL)(app_constants_1.BUCKET, app_constants_1.ADMIN_DIR, KEY);
        const avatar = (0, s3_1.getImageURL)(app_constants_1.ADMIN_DIR, KEY);
        return res.status(statusCodes_1.STATUS.success).send({ data: { avatar, key: KEY, url }, message: success_1.SUCCESS.fetched });
    }
    catch (error) {
        (0, helper_1.errorLogs)('update_user', error);
        return res.status(statusCodes_1.STATUS.server).send({ error: error, message: errors_1.ERRORS.server_error });
    }
};
exports.avatarUploadURL = avatarUploadURL;
const avatarURL = async (req, res) => {
    try {
        const { isValidated, status, message } = (0, user_validation_1.validateAvatarURL)(req.body);
        if (!isValidated)
            return res.status(status).send({ message });
        const { key } = req.body;
        const avatar = (0, s3_1.getImageURL)(app_constants_1.ADMIN_DIR, key);
        return res.status(statusCodes_1.STATUS.success).send({ data: { avatar }, message: success_1.SUCCESS.fetched });
    }
    catch (error) {
        (0, helper_1.errorLogs)('update_user', error);
        return res.status(statusCodes_1.STATUS.server).send({ error: error, message: errors_1.ERRORS.server_error });
    }
};
exports.avatarURL = avatarURL;
const createAdmin = async (req, res) => {
    try {
        const { email, first_name, last_name } = req.body;
        const alreadyExist = await (0, admin_model_1.getAdminByEmail)(email);
        if (alreadyExist)
            return res.status(statusCodes_1.STATUS.badRequest).send({ message: errors_1.ERRORS.email_exist });
        let password = (0, admin_model_1.generatePassword)();
        const admin = new admin_model_1.Admin({ email, first_name, last_name, password });
        await admin.save();
        await (0, emails_1.sendEmailToAdmin)({ email, password, first_name });
        return res.status(statusCodes_1.STATUS.created).send({ data: admin, message: success_1.SUCCESS.created });
    }
    catch (error) {
        (0, helper_1.errorLogs)('create_admin', error);
        return res.status(statusCodes_1.STATUS.server).send({ error: error, message: errors_1.ERRORS.server_error });
    }
};
exports.createAdmin = createAdmin;
const getAllAdmins = async (req, res) => {
    try {
        const admins = await (0, admin_model_1.getAdmins)().select('email first_name last_name is_blocked');
        return res.status(statusCodes_1.STATUS.success).send({ data: admins, message: success_1.SUCCESS.fetched });
    }
    catch (error) {
        (0, helper_1.errorLogs)('get_all_admins', error);
        return res.status(statusCodes_1.STATUS.server).send({ error: error, message: errors_1.ERRORS.server_error });
    }
};
exports.getAllAdmins = getAllAdmins;
const getAdmin = async (req, res) => {
    try {
        const { id = '' } = req.params;
        const admin = await (0, admin_model_1.getAdminById)(id);
        if (!admin) {
            return res.status(statusCodes_1.STATUS.notFound).send({ message: errors_1.ERRORS.not_found });
        }
        return res.status(statusCodes_1.STATUS.success).send({ data: admin, message: success_1.SUCCESS.fetched });
    }
    catch (error) {
        (0, helper_1.errorLogs)('get_admin', error);
        return res.status(statusCodes_1.STATUS.server).send({ error: error, message: errors_1.ERRORS.server_error });
    }
};
exports.getAdmin = getAdmin;
const blockAdmin = async (req, res) => {
    try {
        const { id = '' } = req.params;
        const admin = await (0, admin_model_1.getAdminById)(id);
        if (!admin) {
            return res.status(statusCodes_1.STATUS.notFound).send({ message: errors_1.ERRORS.not_found });
        }
        admin['is_blocked'] = !admin['is_blocked'];
        if (admin['is_blocked'] === true) {
            admin['tokens'] = [{ access_token: '' }];
        }
        admin.save();
        return res.status(statusCodes_1.STATUS.forbidden).send({ data: admin, message: success_1.SUCCESS.blocked });
    }
    catch (error) {
        (0, helper_1.errorLogs)('block_admin', error);
        return res.status(statusCodes_1.STATUS.server).send({ error: error, message: errors_1.ERRORS.server_error });
    }
};
exports.blockAdmin = blockAdmin;
const removeAdmin = async (req, res) => {
    try {
        const { id = '' } = req.params;
        const admin = await (0, admin_model_1.deleteAdminById)(id);
        if (!admin) {
            return res.status(statusCodes_1.STATUS.notFound).send({ message: errors_1.ERRORS.not_found });
        }
        return res.status(statusCodes_1.STATUS.success).send({ data: { _id: admin }, message: success_1.SUCCESS.deleted });
    }
    catch (error) {
        (0, helper_1.errorLogs)('remove_admin', error);
        return res.status(statusCodes_1.STATUS.server).send({ error: error, message: errors_1.ERRORS.server_error });
    }
};
exports.removeAdmin = removeAdmin;
const logoutAll = async (req, res) => {
    try {
        const { id = '' } = req.params;
        const admin = await (0, admin_model_1.getAdminById)(id);
        if (!admin) {
            return res.status(statusCodes_1.STATUS.notFound).send({ message: errors_1.ERRORS.not_found });
        }
        admin.tokens = [];
        await admin.save();
        return res.status(statusCodes_1.STATUS.noContent).send({ data: {}, message: success_1.SUCCESS.logout });
    }
    catch (error) {
        (0, helper_1.errorLogs)('logout_all', error);
        return res.status(statusCodes_1.STATUS.server).send({ error: error, message: errors_1.ERRORS.server_error });
    }
};
exports.logoutAll = logoutAll;
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { admin, token } = await admin_model_1.Admin.findByCredentials(email, password);
        if (!admin)
            return res.status(statusCodes_1.STATUS.badRequest).send({ message: errors_1.ERRORS.wrong_credentials });
        if (admin.is_blocked === true) {
            return res.status(statusCodes_1.STATUS.forbidden).send({ data: admin, message: errors_1.ERRORS.blocked });
        }
        return res.status(statusCodes_1.STATUS.success).send({ data: admin, token, message: success_1.SUCCESS.login });
    }
    catch (error) {
        (0, helper_1.errorLogs)('login_admin', error);
        return res.status(statusCodes_1.STATUS.server).send({ error: error, message: errors_1.ERRORS.server_error });
    }
};
exports.loginAdmin = loginAdmin;
const changedPasswordAdmin = async (req, res) => {
    try {
        const { current_password, new_password, admin } = req.body;
        const isMatch = await bcryptjs_1.default.compare(current_password, admin.password);
        if (!isMatch)
            return res.status(statusCodes_1.STATUS.badRequest).send({ message: errors_1.ERRORS.invalid_curr_pwd });
        if (admin.role === 'admin' && admin.is_email_verified === false) {
            admin['is_email_verified'] = true;
        }
        admin['password'] = new_password;
        await admin.save();
        return res.status(statusCodes_1.STATUS.success).send({ message: success_1.SUCCESS.chg_pwd });
    }
    catch (error) {
        (0, helper_1.errorLogs)('changed_password_admin', error);
        return res.status(statusCodes_1.STATUS.server).send({ error: error, message: errors_1.ERRORS.server_error });
    }
};
exports.changedPasswordAdmin = changedPasswordAdmin;
const updateAdmin = async (req, res) => {
    try {
        let updates = Object.keys(req.body);
        const allowedUpdates = ['first_name', 'last_name', 'avatar'];
        updates = updates.filter((update) => allowedUpdates.includes(update));
        const admin = req.body.admin;
        updates.forEach((update) => {
            admin[update] = req.body[update];
        });
        await admin.save();
        return res.status(statusCodes_1.STATUS.success).send({ data: admin, message: success_1.SUCCESS.updated });
    }
    catch (error) {
        (0, helper_1.errorLogs)('update_admin', error);
        return res.status(statusCodes_1.STATUS.server).send({ error: error, message: errors_1.ERRORS.server_error });
    }
};
exports.updateAdmin = updateAdmin;
const logout = async (req, res) => {
    try {
        const { admin, access_token } = req.body;
        admin.tokens = admin.tokens.filter((token) => token.access_token !== access_token);
        await admin.save();
        res.status(statusCodes_1.STATUS.success).send({ message: success_1.SUCCESS.logout });
    }
    catch (error) {
        (0, helper_1.errorLogs)('logout', error);
        res.status(statusCodes_1.STATUS.server).send({ error: error, message: errors_1.ERRORS.server_error });
    }
};
exports.logout = logout;
//# sourceMappingURL=admin.controller.js.map