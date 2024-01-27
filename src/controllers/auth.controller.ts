import bcrypt from "bcryptjs";
import express from "express";
import { ERRORS } from "../messages/errors";
import { STATUS } from "../messages/statusCodes";
import { SUCCESS } from "../messages/success";
import { User, deleteUserById, getUserByEmail } from "../models/user.model";
import { errorLogs } from "../utils/helper";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email } = req.body;

    const alreadyExist = await getUserByEmail(email);
    if (alreadyExist)
      return res
        .status(STATUS.badRequest)
        .send({ message: ERRORS.email_exist });

    const userData = {
      ...req.body,
      provider: "default",
      role: "user",
    };

    const user = await new User(userData).save();

    await user.generateAndSendOTP("authentication", email);

    return res.status(STATUS.created).send({ message: SUCCESS.otp_send });
  } catch (error: unknown | any) {
    errorLogs("register", error);
    return res
      .status(STATUS.server)
      .send({ error: error, message: ERRORS.server_error });
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await User.findByCredentials(email, password);

    if (!user)
      return res
        .status(STATUS.badRequest)
        .send({ message: ERRORS.wrong_credentials });

    if (user["is_blocked"] === true) {
      return res
        .status(STATUS.forbidden)
        .send({ data: user, message: ERRORS.blocked });
    }

    if (user.is_email_verified === false)
      return res.status(STATUS.success).send({
        data: { is_email_verified: user.is_email_verified },
        message: SUCCESS.otp_send,
      });

    return res
      .status(STATUS.success)
      .send({ data: user, token, message: SUCCESS.login });
  } catch (error: unknown | any) {
    errorLogs("login", error);
    return res
      .status(STATUS.server)
      .send({ error: error, message: ERRORS.server_error });
  }
};

export const verifyOTP = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { otp, email, type } = req.body;
    const user = await getUserByEmail(email);

    if (!user) {
      return res
        .status(STATUS.badRequest)
        .send({ message: ERRORS.email_not_exist });
    }

    const isValidOTP = await user.verifyOTP(otp);
    if (isValidOTP === false)
      return res
        .status(STATUS.badRequest)
        .send({ message: ERRORS.invalid_otp });

    if (user.otp.otp_type !== type)
      return res
        .status(STATUS.badRequest)
        .send({ message: ERRORS.invalid_otp_type });

    if (type === "reset_password") {
      user["otp"] = { ...user.otp, verified: true, otp_type: "none" };
      await user.save();
      return res.status(STATUS.success).send({ message: SUCCESS.verified });
    }

    if (type === "changed_email") {
      user["email"] = user["temp_email"];
      user["temp_email"] = "";
      user["otp"] = { text: "", expiry: "", verified: false, otp_type: "none" };
      await user.save();
      return res.status(STATUS.success).send({ message: SUCCESS.chg_email });
    }

    const token = await user.generateAccessToken();
    user["otp"] = { text: "", expiry: "", verified: false, otp_type: "none" };
    user["is_email_verified"] = true;
    await user.save();

    console.log(user.otp);

    return res
      .status(STATUS.success)
      .send({ data: user, token, message: SUCCESS.verified });
  } catch (error: unknown | any) {
    errorLogs("verify_otp", error);
    return res
      .status(STATUS.server)
      .send({ error: error, message: ERRORS.server_error });
  }
};

export const resendOTP = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email, type } = req.body;

    const user = await getUserByEmail(email);

    if (!user) {
      return res
        .status(STATUS.badRequest)
        .send({ message: ERRORS.email_not_exist });
    }

    console.log(user.otp.otp_type);

    if (user.otp.otp_type !== type)
      return res
        .status(STATUS.badRequest)
        .send({ message: ERRORS.invalid_otp_type });

    await user.generateAndSendOTP(type, email);
    return res.status(STATUS.success).send({ message: SUCCESS.otp_send });
  } catch (error: unknown | any) {
    errorLogs("resend_otp", error);
    return res
      .status(STATUS.server)
      .send({ error: error, message: ERRORS.server_error });
  }
};

export const forgotPassword = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email } = req.body;

    const user = await getUserByEmail(email);

    if (!user)
      return res
        .status(STATUS.badRequest)
        .send({ message: ERRORS.email_not_exist });

    // const resetToken = await user.generateAndSendResetToken(email);
    // await sendResetPasswordEmail(email, resetToken);

    await user.generateAndSendOTP("reset_password", email);
    return res.status(STATUS.success).send({ message: SUCCESS.otp_send });

    // return res
    //   .status(STATUS.success)
    //   .send({ message: SUCCESS.reset_password_link_sent });
  } catch (error: unknown | any) {
    errorLogs("forgot_password", error);
    return res
      .status(STATUS.server)
      .send({ error: error, message: ERRORS.server_error });
  }
};

export const resetPassword = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email = "", new_password = "" } = req.body;

    const user = await getUserByEmail(email);

    if (!user)
      return res
        .status(STATUS.badRequest)
        .send({ message: ERRORS.email_not_exist });

    if (user.otp.verified === false)
      return res
        .status(STATUS.badRequest)
        .send({ message: ERRORS.please_verify_otp });

    user["otp"] = { text: "", expiry: "", verified: false, otp_type: "none" };
    user["password"] = new_password;
    await user.save();

    return res.status(STATUS.success).send({ message: SUCCESS.reset_pwd });
  } catch (error: unknown | any) {
    errorLogs("reset_password", error);
    return res
      .status(STATUS.server)
      .send({ error: error, message: ERRORS.server_error });
  }
};

export const changedPassword = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { current_password, new_password, user } = req.body;

    const isMatch = await bcrypt.compare(current_password, user.password);
    if (!isMatch)
      return res
        .status(STATUS.badRequest)
        .send({ message: ERRORS.invalid_curr_pwd });

    user["password"] = new_password;
    await user.save();

    return res.status(STATUS.success).send({ message: SUCCESS.chg_pwd });
  } catch (error: unknown | any) {
    errorLogs("changed_password", error);
    return res
      .status(STATUS.server)
      .send({ error: error, message: ERRORS.server_error });
  }
};

export const changedEmail = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { new_email, user } = req.body;

    await user.generateAndSendOTP("changed_email", new_email);
    user["temp_email"] = new_email;
    user.save();

    return res.status(STATUS.success).send({ message: SUCCESS.otp_send });
  } catch (error: unknown | any) {
    errorLogs("changed_email", error);
    return res
      .status(STATUS.server)
      .send({ error: error, message: ERRORS.server_error });
  }
};

export const logout = async (req: express.Request, res: express.Response) => {
  try {
    const { user, access_token } = req.body;

    user.tokens = user.tokens.filter(
      (token: { access_token: string }) => token.access_token !== access_token
    );
    await user.save();

    res.status(STATUS.success).send({ message: SUCCESS.logout });
  } catch (error: unknown | any) {
    errorLogs("logout", error);
    res
      .status(STATUS.server)
      .send({ error: error, message: ERRORS.server_error });
  }
};

export const deleteAccount = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { user, current_password } = req.body;

    const isMatch = await bcrypt.compare(current_password, user.password);
    if (!isMatch)
      return res
        .status(STATUS.badRequest)
        .send({ message: ERRORS.invalid_curr_pwd });

    await deleteUserById(user._id);

    return res
      .status(STATUS.success)
      .send({ data: { _id: user._id }, message: SUCCESS.deleted });
  } catch (error: unknown | any) {
    errorLogs("logout", error);
    return res
      .status(STATUS.server)
      .send({ error: error, message: ERRORS.server_error });
  }
};
