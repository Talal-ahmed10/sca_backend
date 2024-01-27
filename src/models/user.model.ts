import bcrypt from "bcryptjs";
import crypto from "crypto";

import jwt from "jsonwebtoken";
import { Model, Schema, model } from "mongoose";
import { OTP_DIGITS, OTP_EXPIRY, OTP_TYPES } from "../app_constants";
import { OTP_TYPE } from "../types";

interface IUser {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  avatar: string;
  notification: boolean;
  is_blocked: boolean;
  is_email_verified: boolean;
  role: string;
  temp_email: string;
  otp: { text: string; expiry: string; verified: boolean; otp_type: string };
  tokens: { access_token: string }[];
}

interface IUserMethods {
  generateAccessToken(): Promise<{
    access_token: string;
  }>;

  generateAndSendOTP(otp_type: OTP_TYPE, sender_email: string): Promise<string>;
  generateAndSendResetToken(sender_email: string): Promise<string>;

  verifyOTP(otp: string): Promise<boolean>;
}

interface UserModel extends Model<IUser, {}, IUserMethods> {
  findByCredentials(
    email: string,
    password: string
  ): Promise<{
    user: IUser;
    token: { access_token: string };
  }>;
}

const schema = new Schema<IUser, UserModel, IUserMethods>(
  {
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      require: true,
      trim: true,
      minLength: 8,
    },

    first_name: {
      type: String,
      trim: true,
      minLength: 3,
    },

    last_name: {
      type: String,
      trim: true,
      minLength: 3,
    },

    avatar: { type: String, default: "" },

    notification: { type: Boolean, default: true },

    is_email_verified: {
      type: Boolean,
      default: false,
    },

    is_blocked: {
      type: Boolean,
      default: false,
    },

    temp_email: {
      type: String,
      default: "",
    },

    otp: {
      text: { type: String, default: "" },
      expiry: { type: String, default: "" },
      verified: { type: Boolean, default: false },
      otp_type: {
        type: String,
        enum: {
          values: OTP_TYPES,
          message: "{VALUE} is not supported",
        },
      },
    },

    role: {
      type: String,
      required: true,
      enum: {
        values: ["user", "admin"],
        message: "{VALUE} is not supported",
      },
    },

    tokens: [
      {
        access_token: { type: String, default: "" },
      },
    ],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },

    toJSON: {
      transform: function (doc, ret) {
        delete ret["password"];
        delete ret["role"];
        delete ret["otp"];
        delete ret["tokens"];
        delete ret["temp_email"];
        delete ret["__v"];
      },
    },
  }
);

schema.virtual("decks", {
  ref: "Deck",
  localField: "_id",
  foreignField: "owner",
});

schema.method("generateAccessToken", async function () {
  const user = this;
  const access_token: string = jwt.sign(
    { _id: user._id.toString() },
    process.env.ACCESS_TOKEN_SECRET + ""
  );
  user.tokens = user.tokens.concat({ access_token });
  await user.save();
  return access_token;
});

schema.method("generateAndSendOTP", async function (otp_type, sender_email) {
  const user = this;

  let otp: string = "";

  for (let i = 0; i < OTP_DIGITS; i++) {
    otp += Math.round(Math.random() * 9).toString();
  }
  otp = "000000";

  //sendOtpToUser(otp, user.username, sender_email);

  const hashedOTP = await bcrypt.hash(otp, Number(process.env.BCRYPT_ROUNDS));
  user["otp"] = {
    text: hashedOTP,
    expiry: new Date(new Date().getTime() + OTP_EXPIRY).toISOString(),
    verified:false,
    otp_type: otp_type,
  };
  await user.save();

  return otp;
});

schema.method("generateAndSendResetToken", async function () {
  const user = this;

  const resetToken = crypto.randomBytes(20).toString("hex");

  user.otp = {
    text: resetToken,
    expiry: new Date(new Date().getTime() + OTP_EXPIRY).toISOString(),
    otp_type: "reset_password",
    verified: false,
  };

  await user.save();

  return resetToken;
});

schema.method("verifyOTP", async function verifyOTP(otp) {
  const user = this;

  if (new Date().toISOString() > user.otp.expiry) {
    // user["otp"] = { text: "", expiry: "" };
    // await user.save();
    return false;
  }

  return await bcrypt.compare(otp, user.otp.text);
});

schema.static(
  "findByCredentials",
  async function findByCredentials(email, password) {
    let user = await User.findOne({ email });

    if (!user) return {};

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return {};

    if (user.is_email_verified === true && user.is_blocked === false) {
      const token = await user.generateAccessToken();
      return { user, token };
    }

    return { user };
  }
);

schema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(
      user.password,
      Number(process.env.BCRYPT_ROUNDS)
    );
  }
  next();
});

export const User = model<IUser, UserModel>("User", schema);

export const getUserByEmail = (email: string) =>
  User.findOne({ email })
    .then((user) => user)
    .catch((e) => {});

export const getUsers = () => User.find();
export const getUserById = async (id: string) => User.findOne({ _id: id });
export const deleteUserById = (id: string) => User.findByIdAndDelete(id);
export const updateUserById = (id: string, values: Record<string, any>) =>
  User.findByIdAndUpdate(id, values);
