let multer = require('multer')
let fs= require('fs')
let path = require('path')

let storageProfilePic = multer.diskStorage({
    destination: "./uploads/profilePic",
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

let uploadProfilePic = multer({
    storage: storageProfilePic,
    limits: 10 * 1024 * 1024
})

module.exports = {storageProfilePic, uploadProfilePic}