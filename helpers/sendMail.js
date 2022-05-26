require('dotenv').config();

async function sendMail(email, message) {
  
    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    }
    });

    const mailOptions = {
    from: 'rentroomofficiall@gmail.com',
    to: email,
    subject: "Success Create Account",
    html: message
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });
  }
  
  module.exports = sendMail