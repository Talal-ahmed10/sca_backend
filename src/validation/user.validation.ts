import express from "express";
import { ERRORS } from "../messages/errors";
import { STATUS } from "../messages/statusCodes";

export const validateUpdate = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    if (Object.keys(req.body).length < 3) {
      throw new Error(ERRORS.pro_at_least_one_field);
    }
    next();
  } catch (error: any | unknown) {
    console.log(error);
    res.status(STATUS.badRequest).send({ message: error.message });
  }
};

export const validateAvatarUploadURL = ({
  file_type = "",
}): { isValidated: boolean; status: number; message: string } => {
  if (!file_type.trim())
    return {
      isValidated: false,
      status: STATUS.badRequest,
      message: ERRORS.file_type,
    };

  return { isValidated: true, status: STATUS.success, message: "" };
};

export const validateAvatarURL = ({
  key = "",
}): { isValidated: boolean; status: number; message: string } => {
  if (!key.trim())
    return {
      isValidated: false,
      status: STATUS.badRequest,
      message: ERRORS.key,
    };

  return { isValidated: true, status: STATUS.success, message: "" };
};
