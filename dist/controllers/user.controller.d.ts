import express from 'express';
export declare const getOne: (req: express.Request, res: express.Response) => Promise<void>;
export declare const avatarUploadURL: (req: express.Request, res: express.Response) => Promise<void>;
export declare const avatarURL: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const update: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const remove: (req: express.Request, res: express.Response) => Promise<void>;
