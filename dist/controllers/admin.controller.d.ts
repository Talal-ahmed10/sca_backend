import express from 'express';
export declare const getAllUsers: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const getUser: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const blockUser: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const logoutUser: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const avatarUploadURL: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const avatarURL: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const createAdmin: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const getAllAdmins: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const getAdmin: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const blockAdmin: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const removeAdmin: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const logoutAll: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const loginAdmin: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const changedPasswordAdmin: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const updateAdmin: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const logout: (req: express.Request, res: express.Response) => Promise<void>;