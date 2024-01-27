import express from "express";
export declare const validateUpdate: (req: express.Request, res: express.Response, next: express.NextFunction) => void;
export declare const validateAvatarUploadURL: ({ file_type, }: {
    file_type?: string | undefined;
}) => {
    isValidated: boolean;
    status: number;
    message: string;
};
export declare const validateAvatarURL: ({ key, }: {
    key?: string | undefined;
}) => {
    isValidated: boolean;
    status: number;
    message: string;
};
