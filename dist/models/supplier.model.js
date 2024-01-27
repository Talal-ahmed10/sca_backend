"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSupplierByEmail = exports.Supplier = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        lowercase: true,
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
    category: {
        type: String,
        required: true,
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
    toJSON: {
        transform: function (doc, ret) { },
    },
});
exports.Supplier = (0, mongoose_1.model)('Supplier', schema);
const getSupplierByEmail = (email) => exports.Supplier.findOne({ email })
    .then((user) => user)
    .catch((e) => { });
exports.getSupplierByEmail = getSupplierByEmail;
//# sourceMappingURL=supplier.model.js.map