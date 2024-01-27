import { APP_NAME, LOGO_URI, WEB_BASE_URL } from '../app_constants';

const notProdEnv = () => ['local', 'dev'].includes(process.env.NODE_ENV!);

export const otpEmailTemplate = (otp: string, name: string) => {
    return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification</title>
     <style>
      * {
        padding: 0;
        margin: 0;
        font-family: Helvetica, sans-serif, 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS'
      }
      body {
        background-color: #eeeeee;
        padding: 20px;
      }
      p {
        font-size: 16px;
        color: #62646A;
      }
    .black {
        color: black;
      }
      .mb20 {
        margin-bottom: 20px;
      }
      .mb30 {
        margin-bottom: 30px;
      }
      .mb40 {
        margin-bottom: 40px;
      }
      .mb50 {
        margin-bottom: 50px;
      }
      .textCenter {
        text-align: center;
      }
      .wrapper {
        max-width: 500px;
        background-color: #eeeeee;
        margin: auto;
        padding: 50px 20px;
        border-radius: 5px;
      }
      .btn {
        display: inline-block;
        padding: 15px 40px;
        background-color: #fee822;
        color: #333;
        border-radius: 5px;
        text-decoration: none;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <div class="wrapper">
    <div class="textCenter mb30">
        <a href="${WEB_BASE_URL}" target="_blank">
          <img
            src="${LOGO_URI}"
            alt="logo"
            width="143px"
            height="auto"
            class="mb20"
          />
        </a>
        <h2>OTP Verification</h2>
      </div>
      <p class="mb20">Hi, ${name}</p>
      <p  class="mb20">
        Thank you for choosing ${APP_NAME}. Use the following OTP to complete
          your registration procedures.
      </p>     
     <div class="textCenter mb20">
        <h1 target="_blank">"${otp}"</h1>
      </div>
    
      <p class="mb20">
      Thanks
      </p>
     <i>
     ${notProdEnv() ? `This is from ${process.env.NODE_ENV} environment` : ''}
     </i>
    </div>
  </body>
</html>
  `;
};

export const emailVerificationTemplate = (email: string, password: string, first_name: string) => {
    return `
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification</title>
    <style>
      * {
        padding: 0;
        margin: 0;
        font-family: Helvetica, sans-serif, 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS'
      }
      body {
        background-color: #eeeeee;
        padding: 20px;
      }
      p {
        font-size: 16px;
        color: #62646A;
      }
    .black {
        color: black;
      }
      .mb20 {
        margin-bottom: 20px;
      }
      .mb30 {
        margin-bottom: 30px;
      }
      .mb40 {
        margin-bottom: 40px;
      }
      .mb50 {
        margin-bottom: 50px;
      }
      .textCenter {
        text-align: center;
      }
      .wrapper {
        max-width: 500px;
        background-color: #fff;
        margin: auto;
        padding: 50px 20px;
        border-radius: 5px;
      }
      .btn {
        display: inline-block;
        padding: 15px 40px;
        background-color: #fee822;
        color: #333;
        border-radius: 5px;
        text-decoration: none;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <div class="wrapper">
    <div class="textCenter mb50">
        <a href="${WEB_BASE_URL}" target="_blank">
          <img
            src="${LOGO_URI}"
            alt="logo"
            width="143px"
            height="auto"
            class="mb50"
          />
        </a>
        <h2>Sign-In Invitation</h2>
      </div>
      <p class="mb30">Hi, ${first_name}</p>
      <p>
        Thank you for signing up with us! To activate your account and gain
        access to our exciting features, we need to verify your email address.
      </p>
      <br />
      <p class="mb30">
        Here is your credentials detail: <br />
        <b>Email:</b> ${email} <br />
        <b>Password: </b> ${password}</b>
      </p>
      <div class="textCenter mb50">
        <a href="" target="_blank" class="btn">Open Admin Panel</a>
      </div>
    
      <p class="mb20">
      Thanks <br />
    
      <p>Regards</p>
      <p>${APP_NAME} Team</p>
      </p>
     <i>
     ${notProdEnv() ? `This is from ${process.env.NODE_ENV} environment` : ''}
     </i>
    </div>
  </body>
</html>
`;
};
