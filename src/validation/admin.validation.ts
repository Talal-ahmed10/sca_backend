import express from "express";
import { ERRORS } from "../messages/errors";
import { STATUS } from "../messages/statusCodes";
import { EMAIL_REGEX, PWD_REGEX, NAME_REGEX } from "../app_constants/regex";

export const validateCreateAdmin = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const {
      first_name = "",
      last_name = "",
      email = "",
      password = "",
    } = req.body;

    if (NAME_REGEX.test(first_name.trim()) === false)
      throw new Error(ERRORS.valid_first_name);

    if (NAME_REGEX.test(last_name.trim()) === false)
      throw new Error(ERRORS.valid_last_name);

    if (EMAIL_REGEX.test(email.trim()) === false) throw new Error(ERRORS.email);

    if (PWD_REGEX.test(password.trim()) === false)
      throw new Error(ERRORS.password);

    next();
  } catch (error: any | unknown) {
    res.status(STATUS.badRequest).send({ message: error.message });
  }
};
