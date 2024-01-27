import express from 'express';
export declare const uploadCsv: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const getAllInventory: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const updateInventory: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const deleteInventory: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
export declare const getThresholdInventory: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
