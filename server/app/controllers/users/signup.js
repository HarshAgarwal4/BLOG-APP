const { userModel } = require("../../models/user");
const { sendOTP, verifyOTP } = require("../../services/mail");
const fs = require("fs");
const path = require("path");

async function signup(req, res) {
    console.log("Received file:", req.file); // Debugging file upload

    let filePath = req.file ? req.file.path : "/uploads/default-profile.png"; // Default image

    let otpVerification = await verifyOTP(req.body.email, req.body.otp);
    if (otpVerification.success) {
        let { name, username, email, password } = req.body;
        let obj = { name, username, email, password, path: filePath };

        try {
            let newUser = new userModel(obj);
            await newUser.save();
            res.send({ status: 1, msg: "User registered successfully" });
        } catch (err) {
            console.log("Error saving user:", err);
            if (req.file) {
                fs.unlink(filePath, (error) => {
                    if (error) console.error("Error deleting file:", error);
                });
            }
            res.send({ status: 0, msg: "Unknown error occurred", error: err });
        }
    } else {
        res.send({ status: 2, msg: "Enter correct OTP" });
    }
}


function signUpPage(req, res) {
    res.render("users/signup");
}

async function sendotptoemail(req, res) {
    console.log(req.body.email);
    let r = await sendOTP(req.body.email);

    if (r.success) {
        res.send({ status: 1, msg: "OTP sent successfully" });
    } else {
        res.send({ status: 0, msg: "Error in sending OTP" });
    }
}

module.exports = { signup, signUpPage, sendotptoemail };
