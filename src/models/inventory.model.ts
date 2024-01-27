import { Schema, model } from 'mongoose';

const schema = new Schema(
    {
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
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },

        toJSON: {
            transform: function (doc, ret) {},
        },
    }
);

export const Inventory = model('Inventory', schema);
