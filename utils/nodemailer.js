import nodemailer from 'nodemailer';

//Create transporter
const transporter = nodemailer.createTransport({
    //SMTP server
    host: 'smtp-relay.brevo.com',
    //SMTP port
    port: 587,
    //SMTP authentication
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export default transporter;

