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
import { Model } from 'mongoose';
interface IAdmin {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    avatar: string;
    is_blocked: boolean;
    is_email_verified: boolean;
    role: string;
    tokens: {
        access_token: string;
    }[];
}
interface IAdminMethods {
    generateAccessToken(): Promise<{
        access_token: string;
    }>;
}
interface AdminModel extends Model<IAdmin, {}, IAdminMethods> {
    findByCredentials(email: string, password: string): Promise<{
        admin: IAdmin;
        token: {
            access_token: string;
        };
    }>;
}
export declare const Admin: AdminModel;
export declare const generatePassword: () => string;
export declare const getAdminByEmail: (email: string) => Promise<void | (import("mongoose").Document<unknown, {}, IAdmin> & Omit<IAdmin & {
    _id: import("mongoose").Types.ObjectId;
}, "generateAccessToken"> & IAdminMethods) | null>;
export declare const getAdmins: () => import("mongoose").Query<(import("mongoose").Document<unknown, {}, IAdmin> & Omit<IAdmin & {
    _id: import("mongoose").Types.ObjectId;
}, "generateAccessToken"> & IAdminMethods)[], import("mongoose").Document<unknown, {}, IAdmin> & Omit<IAdmin & {
    _id: import("mongoose").Types.ObjectId;
}, "generateAccessToken"> & IAdminMethods, {}, IAdmin, "find">;
export declare const getAdminById: (id: string) => Promise<(import("mongoose").Document<unknown, {}, IAdmin> & Omit<IAdmin & {
    _id: import("mongoose").Types.ObjectId;
}, "generateAccessToken"> & IAdminMethods) | null>;
export declare const deleteAdminById: (id: string) => import("mongoose").Query<import("mongoose").ModifyResult<import("mongoose").Document<unknown, {}, IAdmin> & Omit<IAdmin & {
    _id: import("mongoose").Types.ObjectId;
}, "generateAccessToken"> & IAdminMethods>, import("mongoose").Document<unknown, {}, IAdmin> & Omit<IAdmin & {
    _id: import("mongoose").Types.ObjectId;
}, "generateAccessToken"> & IAdminMethods, {}, IAdmin, "findOneAndDelete">;
export declare const updateAdminById: (id: string, values: Record<string, any>) => import("mongoose").Query<(import("mongoose").Document<unknown, {}, IAdmin> & Omit<IAdmin & {
    _id: import("mongoose").Types.ObjectId;
}, "generateAccessToken"> & IAdminMethods) | null, import("mongoose").Document<unknown, {}, IAdmin> & Omit<IAdmin & {
    _id: import("mongoose").Types.ObjectId;
}, "generateAccessToken"> & IAdminMethods, {}, IAdmin, "findOneAndUpdate">;
export {};
