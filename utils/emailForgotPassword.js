import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const { EMAIL_USERNAME, EMAIL_PASSWORD } = process.env

const forgotPasswordEmail = async (recipient, url, name) => {
    let transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        secureConnection: false,
        port: 587,
        auth: {
            user: EMAIL_USERNAME,
            pass: EMAIL_PASSWORD,
        },
        tls: {
            ciphers: 'SSLv3'
        }
    });

    const emailContent = {
        from: EMAIL_USERNAME,
        to: recipient,
        subject: "Queer ESEA Events - Reset Password",
        html: `
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap"
                    rel="stylesheet"
                />
                <title>Queer ESEA Events | Reset Password</title>
                <style>
                    body {
                        background-color: #333333;
                        height: 100vh;
                        font-family: "Roboto", sans-serif;
                        color: #fff;
                        position: relative;
                        text-align: center;
                    }
                    .container {
                        max-width: 700px;
                        width: 100%;
                        height: 100%;
                        margin: 0 auto;
                    }
                    .wrapper {
                    padding: 0 15px;
                    }
                    .card {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 100%;
                    }
                    p {
                        padding: 2rem 0;
                        font-size: 16px;
                    }
                    span {
                        color: #ffc107;
                    }
                    button {
                        padding: 1em 6em;
                        border-radius: 5px;
                        border: 0;
                        background-color: #fb923c;
                        color: #fff;
                        transition: all 0.3s ease-in;
                        cursor: pointer;
                        font-size: 18px;
                    }
                    button:hover {
                        opacity: 0.8;
                        transition: all 0.3s ease-in;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="wrapper">
                    <div class="card">
                        <h1>Hey, ${name} 👋</h1>
                        <p>Did you forget your password? Click the button below to reset your password:</p>
                        <a href=${url}><button>Reset Your Password</button></a>
                        <p>If the button above doesn't work, please use this link: ${url}.</p>
                    </div>
                    </div>
                </div>
            </body>
        </html>
    `
    }

    await transporter.sendMail(emailContent);
}
// oauth2client.setCredentials({
//     refresh_token: G_REFRESH_TOKEN,
// });

// const accessToken = oauth2client.getAccessToken();

// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         type: "OAuth2",
//         user: ADMIN_EMAIL,
//         clientId: G_ID,
//         clientSecret: G_SECRET,
//         refreshToken: G_REFRESH_TOKEN,
//         accessToken,
//     }
// })


// transporter.sendMail({ emailContent })
// transporter.sendMail(emailContent, (err, info) => {
//     if (err) return { err };
//     return info;
// })
// }

export default forgotPasswordEmail;