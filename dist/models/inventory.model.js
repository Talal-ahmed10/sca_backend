"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventory = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    inventory_name: {
        type: String,
        required: true,
    },
    incoming: {
        type: Number,
        required: true,
    },
    on_hand: {
        type: Number,
        required: true,
    },
    committed: {
        type: Number,
        required: true,
    },
    fulfillable: {
        type: Number,
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
exports.Inventory = (0, mongoose_1.model)('Inventory', schema);
//# sourceMappingURL=inventory.model.js.map