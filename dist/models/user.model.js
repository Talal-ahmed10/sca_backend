"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserById = exports.deleteUserById = exports.getUserById = exports.getUsers = exports.getUserByEmail = exports.User = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
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
        trim: true,
        minLength: 3,
    },
    last_name: {
        type: String,
        trim: true,
        minLength: 3,
    },
    avatar: { type: String, default: "" },
    notification: { type: Boolean, default: true },
    is_email_verified: {
        type: Boolean,
        default: false,
    },
    is_blocked: {
        type: Boolean,
        default: false,
    },
    temp_email: {
        type: String,
        default: "",
    },
    otp: {
        text: { type: String, default: "" },
        expiry: { type: String, default: "" },
        verified: { type: Boolean, default: false },
        otp_type: {
            type: String,
            enum: {
                values: app_constants_1.OTP_TYPES,
                message: "{VALUE} is not supported",
            },
        },
    },
    role: {
        type: String,
        required: true,
        enum: {
            values: ["user", "admin"],
            message: "{VALUE} is not supported",
        },
    },
    tokens: [
        {
            access_token: { type: String, default: "" },
        },
    ],
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
    toJSON: {
        transform: function (doc, ret) {
            delete ret["password"];
            delete ret["role"];
            delete ret["otp"];
            delete ret["tokens"];
            delete ret["temp_email"];
            delete ret["__v"];
        },
    },
});
schema.virtual("decks", {
    ref: "Deck",
    localField: "_id",
    foreignField: "owner",
});
schema.method("generateAccessToken", async function () {
    const user = this;
    const access_token = jsonwebtoken_1.default.sign({ _id: user._id.toString() }, process.env.ACCESS_TOKEN_SECRET + "");
    user.tokens = user.tokens.concat({ access_token });
    await user.save();
    return access_token;
});
schema.method("generateAndSendOTP", async function (otp_type, sender_email) {
    const user = this;
    let otp = "";
    for (let i = 0; i < app_constants_1.OTP_DIGITS; i++) {
        otp += Math.round(Math.random() * 9).toString();
    }
    otp = "000000";
    const hashedOTP = await bcryptjs_1.default.hash(otp, Number(process.env.BCRYPT_ROUNDS));
    user["otp"] = {
        text: hashedOTP,
        expiry: new Date(new Date().getTime() + app_constants_1.OTP_EXPIRY).toISOString(),
        verified: false,
        otp_type: otp_type,
    };
    await user.save();
    return otp;
});
schema.method("generateAndSendResetToken", async function () {
    const user = this;
    const resetToken = crypto_1.default.randomBytes(20).toString("hex");
    user.otp = {
        text: resetToken,
        expiry: new Date(new Date().getTime() + app_constants_1.OTP_EXPIRY).toISOString(),
        otp_type: "reset_password",
        verified: false,
    };
    await user.save();
    return resetToken;
});
schema.method("verifyOTP", async function verifyOTP(otp) {
    const user = this;
    if (new Date().toISOString() > user.otp.expiry) {
        return false;
    }
    return await bcryptjs_1.default.compare(otp, user.otp.text);
});
schema.static("findByCredentials", async function findByCredentials(email, password) {
    let user = await exports.User.findOne({ email });
    if (!user)
        return {};
    const isMatch = await bcryptjs_1.default.compare(password, user.password);
    if (!isMatch)
        return {};
    if (user.is_email_verified === true && user.is_blocked === false) {
        const token = await user.generateAccessToken();
        return { user, token };
    }
    return { user };
});
schema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcryptjs_1.default.hash(user.password, Number(process.env.BCRYPT_ROUNDS));
    }
    next();
});
exports.User = (0, mongoose_1.model)("User", schema);
const getUserByEmail = (email) => exports.User.findOne({ email })
    .then((user) => user)
    .catch((e) => { });
exports.getUserByEmail = getUserByEmail;
const getUsers = () => exports.User.find();
exports.getUsers = getUsers;
const getUserById = async (id) => exports.User.findOne({ _id: id });
exports.getUserById = getUserById;
const deleteUserById = (id) => exports.User.findByIdAndDelete(id);
exports.deleteUserById = deleteUserById;
const updateUserById = (id, values) => exports.User.findByIdAndUpdate(id, values);
exports.updateUserById = updateUserById;
//# sourceMappingURL=user.model.js.map