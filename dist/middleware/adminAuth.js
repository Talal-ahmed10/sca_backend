"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const statusCodes_1 = require("../messages/statusCodes");
const helper_1 = require("../utils/helper");
const admin_model_1 = require("../models/admin.model");
const errors_1 = require("../messages/errors");
const adminAuth = async (req, res, next) => {
    var _a;
    try {
        const access_token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        if (!access_token)
            throw new Error();
        const decode = jsonwebtoken_1.default.verify(access_token, process.env.ACCESS_TOKEN_SECRET + "");
        const admin = await admin_model_1.Admin.findOne({
            _id: decode._id,
            "tokens.access_token": access_token,
        });
        if (!admin)
            throw new Error();
        req.body["admin"] = admin;
        req.body["access_token"] = access_token;
        next();
    }
    catch (error) {
        (0, helper_1.errorLogs)("auth", error);
        res.status(statusCodes_1.STATUS.unauthorized).send({ message: errors_1.ERRORS.unauthorized });
    }
};
exports.adminAuth = adminAuth;
//# sourceMappingURL=adminAuth.js.map