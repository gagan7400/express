// email send file 
// we have to install the nodemailer ,

const nodemailer = require("nodemailer");

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL,
        pass: process.env.PASS,
    },
});

async function MAILSEND(reciverMail, subject, text, html) {
    try {
        const info = await transporter.sendMail({
            from: process.env.GMAIL, // sender address
            to: reciverMail, // list of recipients
            subject, // subject line
            text, // plain text body
            html, // HTML body
        });
        console.log(info.messageId)
        return info.messageId
    } catch (err) {
        return err
    }
}
module.exports = { MAILSEND }