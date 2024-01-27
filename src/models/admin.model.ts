import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Model, Schema, model } from 'mongoose';
import { PASS_DIGITS } from '../app_constants';

interface IAdmin {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    avatar: string;
    is_blocked: boolean;
    is_email_verified: boolean;
    role: string;
    tokens: { access_token: string }[];
}

interface IAdminMethods {
    generateAccessToken(): Promise<{
        access_token: string;
    }>;
}

interface AdminModel extends Model<IAdmin, {}, IAdminMethods> {
    findByCredentials(
        email: string,
        password: string
    ): Promise<{
        admin: IAdmin;
        token: { access_token: string };
    }>;
}

const schema = new Schema<IAdmin, AdminModel, IAdminMethods>(
    {
        email: {
            type: String,
            require: true,
            trim: true,
            unique: true,
            lowercase: true,
        },

        password: {
            type: String,
            require: true,
            trim: true,
            minLength: 8,
        },

        first_name: {
            type: String,
            require: true,
            trim: true,
            minLength: 3,
        },

        last_name: {
            type: String,
            require: true,
            trim: true,
            minLength: 3,
        },

        avatar: { type: String, default: '' },

        is_email_verified: {
            type: Boolean,
            default: false,
        },

        is_blocked: {
            type: Boolean,
            default: false,
        },

        role: {
            type: String,
            default: 'admin',
            enum: {
                values: ['admin', 'super_admin'],
                message: '{VALUE} is not supported',
            },
        },

        tokens: [
            {
                access_token: { type: String, default: '' },
            },
        ],
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },

        toJSON: {
            transform: function (doc, ret) {
                delete ret['password'];
                delete ret['tokens'];
                delete ret['__v'];
            },
        },
    }
);

schema.method('generateAccessToken', async function () {
    const admin = this;
    const access_token: string = jwt.sign({ _id: admin._id.toString() }, process.env.ACCESS_TOKEN_SECRET + '');
    admin.tokens = admin.tokens.concat({ access_token });
    await admin.save();
    return access_token;
});

schema.static('findByCredentials', async function findByCredentials(email, password) {
    let admin = await Admin.findOne({ email });

    if (!admin) return {};

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return {};

    let token = null;

    if (admin.is_blocked === false) {
        token = await admin.generateAccessToken();
    }

    return { admin, token };
});

schema.pre('save', async function (next) {
    const admin = this;

    if (admin.isModified('password')) {
        admin.password = await bcrypt.hash(admin.password, Number(process.env.BCRYPT_ROUNDS));
    }
    next();
});

export const Admin = model<IAdmin, AdminModel>('Admin', schema);

export const generatePassword = () => {
    let password: string = '';

    for (let i = 0; i < PASS_DIGITS; i++) {
        password += Math.round(Math.random() * 9).toString();
    }
    return password;
};

export const getAdminByEmail = (email: string) =>
    Admin.findOne({ email })
        .then((admin) => admin)
        .catch((e) => {});

export const getAdmins = () => Admin.find({ role: 'admin' });
export const getAdminById = async (id: string) => Admin.findById(id);
export const deleteAdminById = (id: string) => Admin.findByIdAndDelete(id);
export const updateAdminById = (id: string, values: Record<string, any>) => Admin.findByIdAndUpdate(id, values);
