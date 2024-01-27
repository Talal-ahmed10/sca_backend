import S3 from "aws-sdk/clients/s3";
import { BUCKET } from "../../app_constants";

const s3 = new S3({
  ...(process.env.NODE_ENV === "local" && {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  }),
  region: process.env.REGION,
  signatureVersion: "v4",
});

export const getUploadImageURL = async (
  bucket: string,
  dir: string,
  key: string
) => {
  const params = {
    Bucket: `${bucket}/${dir}`,
    Key: key,
    Expires: 60 * 60,
    ContentType: "image/*",
  };

  return await s3.getSignedUrlPromise("putObject", params);
};

export const getImageURL = (dir: string, key: string) => {
  return `https://${BUCKET}.s3.${process.env.REGION}.amazonaws.com/${dir}/${key}`;
};

export const removeFileFromS3 = async (dir: string, key: string) => {
  const params = {
    Bucket: BUCKET,
    Key: `${dir}/${key.slice(key.lastIndexOf("/") + 1, key.length)}`,
  };

  return await s3.deleteObject(params).promise();
};
