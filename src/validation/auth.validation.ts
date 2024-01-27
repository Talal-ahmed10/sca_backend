import express from "express";
import { Error } from "mongoose";
import { OTP_TYPES } from "../app_constants";
import { EMAIL_REGEX, PWD_REGEX } from "../app_constants/regex";
import { ERRORS } from "../messages/errors";
import { STATUS } from "../messages/statusCodes";

export const validateRegister = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { email = "", password = "" } = req.body;

    if (EMAIL_REGEX.test(email.trim()) === false)
      throw new Error(ERRORS.valid_email);

    if (PWD_REGEX.test(password.trim()) === false)
      throw new Error(ERRORS.valid_pwd);

    next();
  } catch (error: any | unknown) {
    console.log(error);
    res.status(STATUS.badRequest).send({ message: error.message });
  }
};

export const validateLogin = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { email = "", password = "" } = req.body;

    if (!email.trim()) throw new Error(ERRORS.email);

    if (!password.trim()) throw new Error(ERRORS.password);

    next();
  } catch (error: any | unknown) {
    console.log(error);
    res.status(STATUS.badRequest).send({ message: error.message });
  }
};

export const validateVerifyOTP = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { type = "", email = "", otp = "" } = req.body;

    if (OTP_TYPES.includes(type) === false)
      throw new Error(ERRORS.invalid_otp_type);

    if (!email.trim()) throw new Error(ERRORS.email);

    if (!otp.trim()) throw new Error(ERRORS.otp);

    next();
  } catch (error: any | unknown) {
    console.log(error);
    res.status(STATUS.badRequest).send({ message: error.message });
  }
};

export const validateResendOTP = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { type, email } = req.body;

    if (OTP_TYPES.includes(type) === false)
      throw new Error(ERRORS.invalid_otp_type);

    if (!email.trim()) throw new Error(ERRORS.email);

    next();
  } catch (error: any | unknown) {
    console.log(error);
    res.status(STATUS.badRequest).send({ message: error.message });
  }
};

export const validateEmail = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { email = "" } = req.body;

    if (!email.trim()) throw new Error(ERRORS.email);

    next();
  } catch (error: any | unknown) {
    res.status(STATUS.badRequest).send({ message: error.message });
  }
};

export const validateResetPassword = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { email = "", new_password = "" } = req.body;

    if (!email.trim()) throw new Error(ERRORS.email);

    if (PWD_REGEX.test(new_password.trim()) === false)
      throw new Error(ERRORS.valid_new_pwd);

    next();
  } catch (error: any | unknown) {
    res.status(STATUS.badRequest).send({ message: error.message });
  }
};

export const validateChangedPassword = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { current_password = "", new_password = "" } = req.body;

    if (!current_password.trim()) throw new Error(ERRORS.pro_curr_pwd);
    if (PWD_REGEX.test(new_password.trim()) === false)
      throw new Error(ERRORS.valid_new_pwd);

    next();
  } catch (error: any | unknown) {
    res.status(STATUS.badRequest).send({ message: error.message });
  }
};

export const validateNewEmail = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { new_email = "" } = req.body;

    if (!new_email.trim()) throw new Error(ERRORS.email);

    next();
  } catch (error: any | unknown) {
    res.status(STATUS.badRequest).send({ message: error.message });
  }
};

export const validateDelAcc = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { current_password = "" } = req.body;

    if (!current_password.trim()) throw new Error(ERRORS.pro_curr_pwd);

    next();
  } catch (error: any | unknown) {
    res.status(STATUS.badRequest).send({ message: error.message });
  }
};
