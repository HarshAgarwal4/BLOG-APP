const { userModel } = require("../../models/user");
const { sendOTP, verifyOTP } = require("../../services/mail");
const fs = require("fs");
const path = require("path");
const { cloudinary, deleteImageByUrl } = require("../../services/multerProfile");

async function signup(req, res) {

    let filePath = req.file ? req.file.path : "/assets/images/default-profile.png";

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
            if (req.file){
                deleteImageByUrl(req.file.path);
            }

            res.send({ status: 0, msg: "Unknown error occurred", error: err });
        }
    } else {
        res.send({ status: 2, msg: "Enter correct OTP" });
        if (req.file){
            deleteImageByUrl(req.file.path);
        }
    }
}


function signUpPage(req, res) {
    let cookies = req.cookies?.UID;
    if (cookies) {
        res.clearCookie('UID');
    }
    res.render("users/signup");
}

async function sendotptoemail(req, res) {
    let r = await sendOTP(req.body.email);

    if (r.success) {
        res.send({ status: 1, msg: "OTP sent successfully" });
    } else {
        res.send({ status: 0, msg: "Error in sending OTP" });
    }
}

module.exports = { signup, signUpPage, sendotptoemail };
