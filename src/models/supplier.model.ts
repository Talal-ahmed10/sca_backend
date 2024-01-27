import { Schema, model } from 'mongoose';

const schema = new Schema(
    {
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

export const Supplier = model('Supplier', schema);

export const getSupplierByEmail = (email: string) =>
    Supplier.findOne({ email })
        .then((user) => user)
        .catch((e) => {});
