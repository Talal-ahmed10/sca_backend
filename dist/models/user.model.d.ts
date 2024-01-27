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
import { Model } from "mongoose";
import { OTP_TYPE } from "../types";
interface IUser {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    avatar: string;
    notification: boolean;
    is_blocked: boolean;
    is_email_verified: boolean;
    role: string;
    temp_email: string;
    otp: {
        text: string;
        expiry: string;
        verified: boolean;
        otp_type: string;
    };
    tokens: {
        access_token: string;
    }[];
}
interface IUserMethods {
    generateAccessToken(): Promise<{
        access_token: string;
    }>;
    generateAndSendOTP(otp_type: OTP_TYPE, sender_email: string): Promise<string>;
    generateAndSendResetToken(sender_email: string): Promise<string>;
    verifyOTP(otp: string): Promise<boolean>;
}
interface UserModel extends Model<IUser, {}, IUserMethods> {
    findByCredentials(email: string, password: string): Promise<{
        user: IUser;
        token: {
            access_token: string;
        };
    }>;
}
export declare const User: UserModel;
export declare const getUserByEmail: (email: string) => Promise<void | (import("mongoose").Document<unknown, {}, IUser> & Omit<IUser & {
    _id: import("mongoose").Types.ObjectId;
}, keyof IUserMethods> & IUserMethods) | null>;
export declare const getUsers: () => import("mongoose").Query<(import("mongoose").Document<unknown, {}, IUser> & Omit<IUser & {
    _id: import("mongoose").Types.ObjectId;
}, keyof IUserMethods> & IUserMethods)[], import("mongoose").Document<unknown, {}, IUser> & Omit<IUser & {
    _id: import("mongoose").Types.ObjectId;
}, keyof IUserMethods> & IUserMethods, {}, IUser, "find">;
export declare const getUserById: (id: string) => Promise<(import("mongoose").Document<unknown, {}, IUser> & Omit<IUser & {
    _id: import("mongoose").Types.ObjectId;
}, keyof IUserMethods> & IUserMethods) | null>;
export declare const deleteUserById: (id: string) => import("mongoose").Query<import("mongoose").ModifyResult<import("mongoose").Document<unknown, {}, IUser> & Omit<IUser & {
    _id: import("mongoose").Types.ObjectId;
}, keyof IUserMethods> & IUserMethods>, import("mongoose").Document<unknown, {}, IUser> & Omit<IUser & {
    _id: import("mongoose").Types.ObjectId;
}, keyof IUserMethods> & IUserMethods, {}, IUser, "findOneAndDelete">;
export declare const updateUserById: (id: string, values: Record<string, any>) => import("mongoose").Query<(import("mongoose").Document<unknown, {}, IUser> & Omit<IUser & {
    _id: import("mongoose").Types.ObjectId;
}, keyof IUserMethods> & IUserMethods) | null, import("mongoose").Document<unknown, {}, IUser> & Omit<IUser & {
    _id: import("mongoose").Types.ObjectId;
}, keyof IUserMethods> & IUserMethods, {}, IUser, "findOneAndUpdate">;
export {};
