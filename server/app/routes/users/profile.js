let express = require('express')
const { profile, updateProfile, updatePassword, sendotp } = require('../../controllers/users/profile')
const { isloggedin } = require('../../middlewares/auth')
const { uploadProfilePic, storageProfilePic } = require('../../services/multerProfile')
let fs = require('fs')
let path = require('path')
let multer = require('multer')

let profileRoute = express.Router()

profileRoute.get("/profile",isloggedin, profile)
profileRoute.put("/profile", isloggedin ,uploadProfilePic.single("profile"), updateProfile)
profileRoute.put("/mcafee", isloggedin , updatePassword)
profileRoute.post("/sendotp", isloggedin , sendotp)

module.exports = { profileRoute }