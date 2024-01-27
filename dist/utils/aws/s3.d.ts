import S3 from "aws-sdk/clients/s3";
export declare const getUploadImageURL: (bucket: string, dir: string, key: string) => Promise<string>;
export declare const getImageURL: (dir: string, key: string) => string;
export declare const removeFileFromS3: (dir: string, key: string) => Promise<import("aws-sdk/lib/request").PromiseResult<S3.DeleteObjectOutput, import("aws-sdk").AWSError>>;
