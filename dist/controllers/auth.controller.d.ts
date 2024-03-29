import express from "express";
export declare const register: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const login: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const verifyOTP: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const resendOTP: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const forgotPassword: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const resetPassword: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const changedPassword: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const changedEmail: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const logout: (req: express.Request, res: express.Response) => Promise<void>;
export declare const deleteAccount: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
