const nodemailer = require("nodemailer");
require("dotenv").config();
const email = process.env.EMAIL;
const password = process.env.PASSWORD;

async function registerSuccess(emailUser) {
  const transporter = await nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass: password,
    },
  });
  const mailOptions = {
    from: email,
    to: emailUser,
    subject: "Success create account in homie web app",
    text: "Welcome to homie web app",
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
}

module.exports = registerSuccess;
