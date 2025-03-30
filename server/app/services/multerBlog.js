let multer = require('multer')

let storageBlogPic = multer.diskStorage({
    destination: "./uploads/blogpostPics",
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

let uploadBlogPic = multer({
    storage: storageBlogPic,
    limits: 10 * 1024 * 1024
})

module.exports = {storageBlogPic, uploadBlogPic}