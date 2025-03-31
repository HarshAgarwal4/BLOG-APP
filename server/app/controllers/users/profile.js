const { userModel } = require("../../models/user");
const { hashPassword } = require("../../services/encryption");
const { sendOTP, verifyOTP } = require("../../services/mail");
let bcrypt = require("bcrypt");

function profile(req, res) {
    res.render("users/profile", { id: req.user._id, name: req.user.name, image: req.user.path, email: req.user.email, about: req.user.about, dob: req.user.dob })
}

async function updateProfile(req, res) {
    let { name, about, dob } = req.body;
    
    let user = {
        name: name || req.user.name,
        about: about || req.user.about,
        dob: dob || req.user.dob,
        path: req.file ? req.file.path : req.user.path // Ensure req.file is not undefined
    };
    
    try {
        let updateUser = await userModel.findOneAndUpdate(
            { _id: req.user.id }, 
            { $set: user }, 
            { new: true },
        );
        console.log(updateUser);
        if (updateUser) {
            res.send({ status: 1, msg: "Profile updated successfully" });
        } else {
            res.send({ status: 0, msg: "Failed to update profile" });
        }
    } catch (error) {
        console.error(error);
        res.send({ status: 0, msg: "Error updating profile" });
    }
}

async function sendotp(req,res){
    let email = req.user.email
    let r = await sendOTP(email)
    if(r.success == true){
        res.send({ status: 1, msg: "OTP sent successfully" });
    }
    else{
        res.send({ status: 0, msg: "Failed to send OTP" });
    }
}

async function updatePassword(req,res){    
    let email = req.user.email
    let r = await verifyOTP(email,otp)
    if(r.success == true){
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        let user = await userModel.findOneAndUpdate(
            { email: email }, 
            { $set: { password: password } }, 
            { new: true },
        );
        if (user) {
            res.send({ status: 1, msg: "Password updated successfully" });
        } else {
            res.send({ status: 0, msg: "Failed to update password" });
        }
    }
    else{
        res.send({ status: 0, msg: "Invalid OTP" });
    }
}



module.exports = { profile, updateProfile , updatePassword, sendotp}