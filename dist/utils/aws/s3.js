"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFileFromS3 = exports.getImageURL = exports.getUploadImageURL = void 0;
const s3_1 = __importDefault(require("aws-sdk/clients/s3"));
const app_constants_1 = require("../../app_constants");
const s3 = new s3_1.default(Object.assign(Object.assign({}, (process.env.NODE_ENV === "local" && {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
})), { region: process.env.REGION, signatureVersion: "v4" }));
const getUploadImageURL = async (bucket, dir, key) => {
    const params = {
        Bucket: `${bucket}/${dir}`,
        Key: key,
        Expires: 60 * 60,
        ContentType: "image/*",
    };
    return await s3.getSignedUrlPromise("putObject", params);
};
exports.getUploadImageURL = getUploadImageURL;
const getImageURL = (dir, key) => {
    return `https://${app_constants_1.BUCKET}.s3.${process.env.REGION}.amazonaws.com/${dir}/${key}`;
};
exports.getImageURL = getImageURL;
const removeFileFromS3 = async (dir, key) => {
    const params = {
        Bucket: app_constants_1.BUCKET,
        Key: `${dir}/${key.slice(key.lastIndexOf("/") + 1, key.length)}`,
    };
    return await s3.deleteObject(params).promise();
};
exports.removeFileFromS3 = removeFileFromS3;
//# sourceMappingURL=s3.js.map