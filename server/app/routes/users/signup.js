let express = require('express')
let fs= require('fs')
let path = require('path')
const { signup, signUpPage, sendotptoemail } = require('../../controllers/users/signup')
const { uploadProfilePic ,storageProfilePic} = require('../../services/multerProfile')
let signUproute = express.Router()

signUproute.post("/signUp",uploadProfilePic.single("profile"), signup)
signUproute.get("/signUp", signUpPage)
signUproute.post("/sendOTP", sendotptoemail)

module.exports = {signUproute}