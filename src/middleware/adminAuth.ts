import express from "express";
import jwt from "jsonwebtoken";
import { STATUS } from "../messages/statusCodes";
import { Decode } from "../types";
import { errorLogs } from "../utils/helper";
import { Admin } from "../models/admin.model";
import { ERRORS } from "../messages/errors";

export const adminAuth = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const access_token = req.header("Authorization")?.replace("Bearer ", "");

    if (!access_token) throw new Error();

    const decode = jwt.verify(
      access_token,
      process.env.ACCESS_TOKEN_SECRET + ""
    ) as Decode;

    const admin = await Admin.findOne({
      _id: decode._id,
      "tokens.access_token": access_token,
    });

    if (!admin) throw new Error();

    req.body["admin"] = admin;
    req.body["access_token"] = access_token;

    next();
  } catch (error: unknown | any) {
    errorLogs("auth", error);
    res.status(STATUS.unauthorized).send({ message: ERRORS.unauthorized });
  }
};
