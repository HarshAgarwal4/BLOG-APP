let express = require('express')
const { profile, updateProfile, updatePassword, sendotp } = require('../../controllers/users/profile')
const { isloggedin } = require('../../middlewares/auth')
const { uploadProfilePic, storageProfilePic } = require('../../services/multerProfile')
let fs = require('fs')
let path = require('path')
let multer = require('multer')
const { giveAccessTo } = require('../../services/authorization')

let profileRoute = express.Router()

profileRoute.get("/profile",isloggedin,giveAccessTo(["NORMAL", "ADMIN"]), profile)
profileRoute.put("/profile", isloggedin,giveAccessTo(["NORMAL", "ADMIN"]) ,uploadProfilePic.single("profile"), updateProfile)
profileRoute.put("/mcafee", isloggedin,giveAccessTo(["NORMAL", "ADMIN"]) , updatePassword)
profileRoute.post("/sendotp", isloggedin,giveAccessTo(["NORMAL", "ADMIN"]) , sendotp)

module.exports = { profileRoute }