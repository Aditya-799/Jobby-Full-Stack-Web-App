import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const sendEmailOtp = async (email, OTP) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            html:`
            <h1>Below is the Otp for Verification</h1>
            <h2>The Otp for Your Verification is ${OTP}</h2>
            <p>Note : Otp Expires with in 5 minutes</p>
            <p>Thank you</p>
            `
        };
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

export default sendEmailOtp