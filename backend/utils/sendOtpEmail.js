import dotenv from "dotenv";

dotenv.config();

import nodemailer from "nodemailer";


// FORCE IPV4 DNS
import dns from "dns";

dns.setDefaultResultOrder(
  "ipv4first"
);


// ================= TRANSPORTER =================

const transporter =
  nodemailer.createTransport({

    host: "smtp.googlemail.com",

    port: 587,

    secure: false,

    pool: false,

    auth: {
      user:
        process.env.EMAIL_USER,

      pass:
        process.env.EMAIL_PASS,
    },

    family: 4,

    tls: {
      ciphers: "SSLv3",
      rejectUnauthorized: false,
    },

    connectionTimeout: 30000,

    greetingTimeout: 30000,

    socketTimeout: 30000,
  });


// ================= SEND OTP EMAIL =================

const sendOtpEmail =
  async (
    to,
    subject,
    otp
  ) => {

    try {

      const info =
        await transporter.sendMail({

          from:
            process.env.EMAIL_USER,

          to,

          subject,

          html: `
            <div
              style="
                font-family: Arial, sans-serif;
                max-width: 500px;
                margin: auto;
                padding: 20px;
                border: 1px solid #e5e5e5;
                border-radius: 10px;
              "
            >

              <h2 style="
                text-align: center;
              ">
                Verify Your Account
              </h2>

              <p>
                Thank you for signing up.
              </p>

              <p>
                Use the OTP below to verify your account:
              </p>

              <div
                style="
                  text-align: center;
                  margin: 30px 0;
                "
              >

                <span
                  style="
                    font-size: 32px;
                    font-weight: bold;
                    letter-spacing: 8px;
                    background: #f3f4f6;
                    padding: 15px 25px;
                    border-radius: 8px;
                    display: inline-block;
                  "
                >

                  ${otp}

                </span>

              </div>

              <p>
                This OTP will expire in
                <strong>
                  5 minutes
                </strong>.
              </p>

              <hr />

              <p
                style="
                  text-align: center;
                  color: gray;
                  font-size: 14px;
                "
              >

                Interview Ace

              </p>

            </div>
          `,
        });

      console.log(
        "EMAIL SENT:"
      );

      console.log(
        info.response
      );

      return true;

    } catch (error) {

      console.log(
        "EMAIL ERROR:"
      );

      console.log(error);

      return false;
    }
  };

export default sendOtpEmail;