import AWS from "aws-sdk";
import { NO_REPLY_EMAIL } from "../../app_constants";

const ses = new AWS.SES({
  ...(process.env.NODE_ENV === "local" && {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  }),
  region: process.env.REGION,
});

export const sendEmail = async ({
  recipientEmail = "",
  subject = "",
  html = "",
}) => {
  let params = {
    Source: NO_REPLY_EMAIL,
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
  } catch (error: unknown | any) {
    console.log("ERR [] =====> ", error, error.message);
  }
};
