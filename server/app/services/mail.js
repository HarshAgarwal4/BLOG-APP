const nodemailer = require("nodemailer");
require('dotenv').config()

const otpStorage = new Map(); 

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.myGMAIL,
        pass: process.env.password 
    }
});
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendOTP(email) {
    const otp = generateOTP();
    otpStorage.set(email, otp);

    const mailOptions = {
        from: `"BLOG APP" <${process.env.myGMAIL}>`,
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP code is ${otp}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        return { success: true, message: "OTP sent successfully" };
    } catch (error) {
        console.error("Error sending OTP:", error);
        return { success: false, message: "Failed to send OTP" };
    }
}

async function verifyOTP(email, userOTP) {
    const storedOTP = otpStorage.get(email);
    if (storedOTP && storedOTP === userOTP) {
        otpStorage.delete(email);
        return { success: true, message: "OTP verified successfully" };
    } else {
        return { success: false, message: "Invalid or expired OTP" };
    }
}

module.exports = { sendOTP, verifyOTP };
