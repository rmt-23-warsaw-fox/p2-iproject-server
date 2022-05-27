"use strict"
const nodemailer = require("nodemailer")

function sendEmail(sendTo, token){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'joindonghacktiv8@gmail.com',
            pass: 'Pohodeu1'
        }
    });
    
    var mailOptions = {
        from: 'joindonghacktiv8@gmail.com',
        to: `${sendTo}`,
        subject: 'Success Register',
        text: `click this link to activate http://localhost:3000/activate?token=${token}`
    };
    
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) throw err;
        console.log('Email sent: ' + info.response);
    });
}


module.exports = {sendEmail};