/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Schema } from 'mongoose';
export declare const Inventory: import("mongoose").Model<{
    inventory_name: string;
    incoming: number;
    on_hand: number;
    committed: number;
    fulfillable: number;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    inventory_name: string;
    incoming: number;
    on_hand: number;
    committed: number;
    fulfillable: number;
}> & {
    inventory_name: string;
    incoming: number;
    on_hand: number;
    committed: number;
    fulfillable: number;
} & {
    _id: import("mongoose").Types.ObjectId;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: {
        createdAt: string;
        updatedAt: string;
    };
    toJSON: {
        transform: (doc: import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
            inventory_name: string;
            incoming: number;
            on_hand: number;
            committed: number;
            fulfillable: number;
        }>> & import("mongoose").FlatRecord<{
            inventory_name: string;
            incoming: number;
            on_hand: number;
            committed: number;
            fulfillable: number;
        }> & {
            _id: import("mongoose").Types.ObjectId;
        }, ret: Record<string, any>) => void;
    };
}, {
    inventory_name: string;
    incoming: number;
    on_hand: number;
    committed: number;
    fulfillable: number;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    inventory_name: string;
    incoming: number;
    on_hand: number;
    committed: number;
    fulfillable: number;
}>> & import("mongoose").FlatRecord<{
    inventory_name: string;
    incoming: number;
    on_hand: number;
    committed: number;
    fulfillable: number;
}> & {
    _id: import("mongoose").Types.ObjectId;
}>>;
