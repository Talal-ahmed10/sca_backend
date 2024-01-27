"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAdminById = exports.deleteAdminById = exports.getAdminById = exports.getAdmins = exports.getAdminByEmail = exports.generatePassword = exports.Admin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = require("mongoose");
const app_constants_1 = require("../app_constants");
const schema = new mongoose_1.Schema({
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
}, {
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
});
schema.method('generateAccessToken', async function () {
    const admin = this;
    const access_token = jsonwebtoken_1.default.sign({ _id: admin._id.toString() }, process.env.ACCESS_TOKEN_SECRET + '');
    admin.tokens = admin.tokens.concat({ access_token });
    await admin.save();
    return access_token;
});
schema.static('findByCredentials', async function findByCredentials(email, password) {
    let admin = await exports.Admin.findOne({ email });
    if (!admin)
        return {};
    const isMatch = await bcryptjs_1.default.compare(password, admin.password);
    if (!isMatch)
        return {};
    let token = null;
    if (admin.is_blocked === false) {
        token = await admin.generateAccessToken();
    }
    return { admin, token };
});
schema.pre('save', async function (next) {
    const admin = this;
    if (admin.isModified('password')) {
        admin.password = await bcryptjs_1.default.hash(admin.password, Number(process.env.BCRYPT_ROUNDS));
    }
    next();
});
exports.Admin = (0, mongoose_1.model)('Admin', schema);
const generatePassword = () => {
    let password = '';
    for (let i = 0; i < app_constants_1.PASS_DIGITS; i++) {
        password += Math.round(Math.random() * 9).toString();
    }
    return password;
};
exports.generatePassword = generatePassword;
const getAdminByEmail = (email) => exports.Admin.findOne({ email })
    .then((admin) => admin)
    .catch((e) => { });
exports.getAdminByEmail = getAdminByEmail;
const getAdmins = () => exports.Admin.find({ role: 'admin' });
exports.getAdmins = getAdmins;
const getAdminById = async (id) => exports.Admin.findById(id);
exports.getAdminById = getAdminById;
const deleteAdminById = (id) => exports.Admin.findByIdAndDelete(id);
exports.deleteAdminById = deleteAdminById;
const updateAdminById = (id, values) => exports.Admin.findByIdAndUpdate(id, values);
exports.updateAdminById = updateAdminById;
//# sourceMappingURL=admin.model.js.map