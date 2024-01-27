import nodemailer from 'nodemailer';
import { emailVerificationTemplate, otpEmailTemplate } from '../template/emails';

const emailConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'talal.algoace@gmail.com',
        pass: 'rdwd ynoi qbcu qmwv',
    },
};

export type SendOtpToUserFunc = (otp: string, name: string, email?: string) => void;

export const sendEmailToAdmin = async ({ email = '', password = '', first_name = '' }) => {
    const transporter = nodemailer.createTransport(emailConfig);

    if (email) {
        const html = emailVerificationTemplate(email, password, first_name);
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

export const sendOtpToUser: SendOtpToUserFunc = async (otp, name, email) => {
    const transporter = nodemailer.createTransport(emailConfig);

    if (email) {
        const html = otpEmailTemplate(otp, name);
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

    // if (phoneNo) {
    // }
};

export const sendResetPasswordEmail = async (email: string, resetToken: string) => {
    // const resetLink = `/reset-password/${resetToken}`;
    // const html = otpEmailTemplate(resetLink);
    // await sendEmail({
    //   recipientEmail: email,
    //   subject: "Password Reset",
    //   html,
    // });
};
