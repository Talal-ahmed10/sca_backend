import bcrypt from 'bcryptjs';
import express from 'express';
import { ADMIN_DIR, BUCKET } from '../app_constants';
import { ERRORS } from '../messages/errors';
import { STATUS } from '../messages/statusCodes';
import { SUCCESS } from '../messages/success';
import {
    Admin,
    deleteAdminById,
    generatePassword,
    getAdminByEmail,
    getAdminById,
    getAdmins,
} from '../models/admin.model';
import { getUserById, getUsers } from '../models/user.model';
import { getImageURL, getUploadImageURL } from '../utils/aws/s3';
import { sendEmailToAdmin } from '../utils/emails';
import { errorLogs } from '../utils/helper';
import { validateAvatarURL, validateAvatarUploadURL } from '../validation/user.validation';

// Admin
export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers().select('email first_name last_name is_blocked');

        return res.status(STATUS.success).send({ data: users, message: SUCCESS.fetched });
    } catch (error: any | unknown) {
        errorLogs('get_all_users', error);
        return res.status(STATUS.server).send({ error: error, message: ERRORS.server_error });
    }
};

export const getUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id = '' } = req.params;
        const user = await getUserById(id);

        if (!user) {
            return res.status(STATUS.notFound).send({ message: ERRORS.not_found });
        }

        return res.status(STATUS.success).send({ data: user, message: SUCCESS.fetched });
    } catch (error: any | unknown) {
        errorLogs('get_user', error);
        return res.status(STATUS.server).send({ error: error, message: ERRORS.server_error });
    }
};

export const blockUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id = '' } = req.params;
        const user = await getUserById(id);

        if (!user) {
            return res.status(STATUS.notFound).send({ message: ERRORS.not_found });
        }

        user['is_blocked'] = !user['is_blocked'];

        if (user['is_blocked'] === true) {
            user['tokens'] = [{ access_token: '' }];
        }

        user.save();

        return res.status(STATUS.success).send({ data: user, message: SUCCESS.blocked });
    } catch (error: any | unknown) {
        errorLogs('block_user', error);
        return res.status(STATUS.server).send({ error: error, message: ERRORS.server_error });
    }
};

export const logoutUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id = '' } = req.params;
        const user = await getUserById(id);

        if (!user) return res.status(STATUS.notFound).send({ message: ERRORS.not_found });

        user.tokens = [];
        user.save();

        return res.status(STATUS.noContent).send({ data: {}, message: SUCCESS.logout });
    } catch (error: any | unknown) {
        errorLogs('logout_user', error);
        return res.status(STATUS.server).send({ error: error, message: ERRORS.server_error });
    }
};

export const avatarUploadURL = async (req: express.Request, res: express.Response) => {
    try {
        const { isValidated, status, message } = validateAvatarUploadURL(req.body);
        if (!isValidated) return res.status(status).send({ message });

        const { file_type, admin } = req.body;

        const KEY = `${admin._id}.${file_type.split('/')[1]}`;
        const url = await getUploadImageURL(BUCKET, ADMIN_DIR, KEY);
        const avatar = getImageURL(ADMIN_DIR, KEY);

        return res.status(STATUS.success).send({ data: { avatar, key: KEY, url }, message: SUCCESS.fetched });
    } catch (error: any | unknown) {
        errorLogs('update_user', error);
        return res.status(STATUS.server).send({ error: error, message: ERRORS.server_error });
    }
};

export const avatarURL = async (req: express.Request, res: express.Response) => {
    try {
        const { isValidated, status, message } = validateAvatarURL(req.body);
        if (!isValidated) return res.status(status).send({ message });

        const { key } = req.body;

        const avatar = getImageURL(ADMIN_DIR, key);

        return res.status(STATUS.success).send({ data: { avatar }, message: SUCCESS.fetched });
    } catch (error: any | unknown) {
        errorLogs('update_user', error);
        return res.status(STATUS.server).send({ error: error, message: ERRORS.server_error });
    }
};

// Super Admin
export const createAdmin = async (req: express.Request, res: express.Response) => {
    try {
        const { email, first_name, last_name } = req.body;

        const alreadyExist = await getAdminByEmail(email);

        if (alreadyExist) return res.status(STATUS.badRequest).send({ message: ERRORS.email_exist });

        let password: string = generatePassword();

        const admin = new Admin({ email, first_name, last_name, password });
        await admin.save();

        await sendEmailToAdmin({ email, password, first_name });

        return res.status(STATUS.created).send({ data: admin, message: SUCCESS.created });
    } catch (error: any | unknown) {
        errorLogs('create_admin', error);
        return res.status(STATUS.server).send({ error: error, message: ERRORS.server_error });
    }
};

export const getAllAdmins = async (req: express.Request, res: express.Response) => {
    try {
        const admins = await getAdmins().select('email first_name last_name is_blocked');
        return res.status(STATUS.success).send({ data: admins, message: SUCCESS.fetched });
    } catch (error: any | unknown) {
        errorLogs('get_all_admins', error);
        return res.status(STATUS.server).send({ error: error, message: ERRORS.server_error });
    }
};

export const getAdmin = async (req: express.Request, res: express.Response) => {
    try {
        const { id = '' } = req.params;
        const admin = await getAdminById(id);

        if (!admin) {
            return res.status(STATUS.notFound).send({ message: ERRORS.not_found });
        }

        return res.status(STATUS.success).send({ data: admin, message: SUCCESS.fetched });
    } catch (error: any | unknown) {
        errorLogs('get_admin', error);
        return res.status(STATUS.server).send({ error: error, message: ERRORS.server_error });
    }
};

export const blockAdmin = async (req: express.Request, res: express.Response) => {
    try {
        const { id = '' } = req.params;
        const admin = await getAdminById(id);

        if (!admin) {
            return res.status(STATUS.notFound).send({ message: ERRORS.not_found });
        }

        admin['is_blocked'] = !admin['is_blocked'];

        if (admin['is_blocked'] === true) {
            admin['tokens'] = [{ access_token: '' }];
        }

        admin.save();

        return res.status(STATUS.forbidden).send({ data: admin, message: SUCCESS.blocked });
    } catch (error: any | unknown) {
        errorLogs('block_admin', error);
        return res.status(STATUS.server).send({ error: error, message: ERRORS.server_error });
    }
};

export const removeAdmin = async (req: express.Request, res: express.Response) => {
    try {
        const { id = '' } = req.params;
        const admin = await deleteAdminById(id);

        if (!admin) {
            return res.status(STATUS.notFound).send({ message: ERRORS.not_found });
        }

        // if (admin?.avatar) {
        //     await removeFileFromS3(ADMIN_DIR, admin?.avatar);
        // }

        return res.status(STATUS.success).send({ data: { _id: admin }, message: SUCCESS.deleted });
    } catch (error: any | unknown) {
        errorLogs('remove_admin', error);
        return res.status(STATUS.server).send({ error: error, message: ERRORS.server_error });
    }
};

export const logoutAll = async (req: express.Request, res: express.Response) => {
    try {
        const { id = '' } = req.params;
        const admin = await getAdminById(id);

        if (!admin) {
            return res.status(STATUS.notFound).send({ message: ERRORS.not_found });
        }
        admin.tokens = [];
        await admin.save();

        return res.status(STATUS.noContent).send({ data: {}, message: SUCCESS.logout });
    } catch (error: any | unknown) {
        errorLogs('logout_all', error);
        return res.status(STATUS.server).send({ error: error, message: ERRORS.server_error });
    }
};

// Common
export const loginAdmin = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        const { admin, token } = await Admin.findByCredentials(email, password);

        if (!admin) return res.status(STATUS.badRequest).send({ message: ERRORS.wrong_credentials });

        if (admin.is_blocked === true) {
            return res.status(STATUS.forbidden).send({ data: admin, message: ERRORS.blocked });
        }

        return res.status(STATUS.success).send({ data: admin, token, message: SUCCESS.login });
    } catch (error: any | unknown) {
        errorLogs('login_admin', error);
        return res.status(STATUS.server).send({ error: error, message: ERRORS.server_error });
    }
};

export const changedPasswordAdmin = async (req: express.Request, res: express.Response) => {
    try {
        const { current_password, new_password, admin } = req.body;

        const isMatch = await bcrypt.compare(current_password, admin.password);
        if (!isMatch) return res.status(STATUS.badRequest).send({ message: ERRORS.invalid_curr_pwd });

        if (admin.role === 'admin' && admin.is_email_verified === false) {
            admin['is_email_verified'] = true;
        }

        admin['password'] = new_password;
        await admin.save();

        return res.status(STATUS.success).send({ message: SUCCESS.chg_pwd });
    } catch (error: any | unknown) {
        errorLogs('changed_password_admin', error);
        return res.status(STATUS.server).send({ error: error, message: ERRORS.server_error });
    }
};

export const updateAdmin = async (req: express.Request, res: express.Response) => {
    try {
        let updates = Object.keys(req.body);
        const allowedUpdates = ['first_name', 'last_name', 'avatar'];

        updates = updates.filter((update) => allowedUpdates.includes(update));
        const admin = req.body.admin;

        updates.forEach((update) => {
            admin[update] = req.body[update];
        });

        await admin.save();

        return res.status(STATUS.success).send({ data: admin, message: SUCCESS.updated });
    } catch (error: any | unknown) {
        errorLogs('update_admin', error);
        return res.status(STATUS.server).send({ error: error, message: ERRORS.server_error });
    }
};

export const logout = async (req: express.Request, res: express.Response) => {
    try {
        const { admin, access_token } = req.body;

        admin.tokens = admin.tokens.filter((token: { access_token: string }) => token.access_token !== access_token);
        await admin.save();

        res.status(STATUS.success).send({ message: SUCCESS.logout });
    } catch (error: unknown | any) {
        errorLogs('logout', error);
        res.status(STATUS.server).send({ error: error, message: ERRORS.server_error });
    }
};
