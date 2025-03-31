let multer = require('multer')
let fs = require('fs')
let path = require('path')

let storageBlogPic = multer.diskStorage({
    destination: "./uploads/blogpostPics",
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

let fileFilter = (req, file, cb) => {
    let allowedExtensions = /jpeg|jpg|png|webp/;
    let extname = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
    let mimetype = allowedExtensions.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        return cb(new Error("Only image files are allowed!"), false);
    }
};

let uploadBlogPic = multer({
    storage: storageBlogPic,
    limits: 10 * 1024 * 1024,
    fileFilter: fileFilter
})

module.exports = {storageBlogPic, uploadBlogPic}