export type SendOtpToUserFunc = (otp: string, name: string, email?: string) => void;
export declare const sendEmailToAdmin: ({ email, password, first_name }: {
    email?: string | undefined;
    password?: string | undefined;
    first_name?: string | undefined;
}) => Promise<void>;
export declare const sendOtpToUser: SendOtpToUserFunc;
export declare const sendResetPasswordEmail: (email: string, resetToken: string) => Promise<void>;
