"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResetPasswordEmail = exports.sendOtpToUser = exports.sendEmailToAdmin = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const emails_1 = require("../template/emails");
const emailConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'talal.algoace@gmail.com',
        pass: 'rdwd ynoi qbcu qmwv',
    },
};
const sendEmailToAdmin = async ({ email = '', password = '', first_name = '' }) => {
    const transporter = nodemailer_1.default.createTransport(emailConfig);
    if (email) {
        const html = (0, emails_1.emailVerificationTemplate)(email, password, first_name);
        const mailOptions = {
            from: process.env.MAIL_ADDRESS,
            to: email,
            subject: 'OTP Verification',
            html,
        };
        await transporter
            .sendMail(mailOptions)
            .then(() => {
            console.log('Email Send Successfully');
        })
            .catch((error) => {
            console.log(error);
        });
    }
};
exports.sendEmailToAdmin = sendEmailToAdmin;
const sendOtpToUser = async (otp, name, email) => {
    const transporter = nodemailer_1.default.createTransport(emailConfig);
    if (email) {
        const html = (0, emails_1.otpEmailTemplate)(otp, name);
        const mailOptions = {
            from: process.env.MAIL_ADDRESS,
            to: email,
            subject: 'OTP Verification',
            html,
        };
        await transporter
            .sendMail(mailOptions)
            .then(() => {
            console.log('Email Send Successfully');
        })
            .catch((error) => {
            console.log(error);
        });
    }
};
exports.sendOtpToUser = sendOtpToUser;
const sendResetPasswordEmail = async (email, resetToken) => {
};
exports.sendResetPasswordEmail = sendResetPasswordEmail;
//# sourceMappingURL=emails.js.map