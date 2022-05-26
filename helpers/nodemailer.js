const nodemailer = require("nodemailer")

async function sendEmail(objMail) {
    try {
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.email,
                pass: process.env.passMail
            },
        });

        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        let date = objMail.date.toLocaleString('id-ID', options)

        let info = await transporter.sendMail({
            from: 'dreamescape774@gmail.com', // sender address
            to: `${objMail.email}`, // list of receivers
            subject: 'Successful payment travelling',
            text: `Halo ${objMail.fullName}, selamat telah membeli paket wisata ${objMail.destinasi} berjumlah ${objMail.amountOfPeople} tiket pada tanggal ${date}`
        });
        console.log("Message sent: %s", info.messageId);

    } catch (error) {
        console.log(error)
    }
}

module.exports = { sendEmail }