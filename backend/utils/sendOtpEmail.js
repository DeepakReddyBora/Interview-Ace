import nodemailer from "nodemailer";

const transporter =
  nodemailer.createTransport({

    service: "gmail",

    auth: {
      user:
        process.env.EMAIL_USER,

      pass:
        process.env.EMAIL_PASS,
    },
  });


// Verify transporter ONCE
transporter.verify(
  function (error, success) {

    if (error) {

      console.log(
        "MAIL SERVER ERROR:"
      );

      console.log(error);

    } else {

      console.log(
        "Mail server ready"
      );
    }
  }
);


// ================= SEND OTP =================

const sendOtpEmail =
  async (
    to,
    subject,
    otp
  ) => {

    try {

      const mailOptions = {

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
              Use the OTP below:
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
              OTP expires in
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
      };

      // IMPORTANT
      const info =
        await Promise.race([

          transporter.sendMail(
            mailOptions
          ),

          new Promise(
            (_, reject) =>

              setTimeout(
                () =>
                  reject(
                    new Error(
                      "Email timeout"
                    )
                  ),

                10000
              )
          ),
        ]);

      console.log(
        "EMAIL SENT:"
      );

      console.log(info);

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