"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const app_constants_1 = require("../../app_constants");
const ses = new aws_sdk_1.default.SES(Object.assign(Object.assign({}, (process.env.NODE_ENV === "local" && {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
})), { region: process.env.REGION }));
const sendEmail = async ({ recipientEmail = "", subject = "", html = "", }) => {
    let params = {
        Source: app_constants_1.NO_REPLY_EMAIL,
        Destination: {
            ToAddresses: [recipientEmail],
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: html,
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: subject,
            },
        },
    };
    try {
        await ses.sendEmail(params).promise();
    }
    catch (error) {
        console.log("ERR [] =====> ", error, error.message);
    }
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=ses.js.map