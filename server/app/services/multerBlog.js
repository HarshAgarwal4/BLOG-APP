// let multer = require('multer')
// let fs = require('fs')
// let path = require('path')

// let storageBlogPic = multer.diskStorage({
//     destination: "./uploads/blogpostPics",
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//     }
// })

// let fileFilter = (req, file, cb) => {
//     let allowedExtensions = /jpeg|jpg|png|webp/;
//     let extname = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
//     let mimetype = allowedExtensions.test(file.mimetype);

//     if (extname && mimetype) {
//         return cb(null, true);
//     } else {
//         return cb(new Error("Only image files are allowed!"), false);
//     }
// };

// let uploadBlogPic = multer({
//     storage: storageBlogPic,
//     limits: 10 * 1024 * 1024,
//     fileFilter: fileFilter
// })

// module.exports = {storageBlogPic, uploadBlogPic}

require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Deletes an image from Cloudinary using its URL.
 * @param {string} imageUrl - The complete URL of the Cloudinary image.
 * @returns {Promise<Object>} - Cloudinary deletion response
 */
async function deleteBlogImageByBlogUrl(imageUrl) {
    try {
        if (!imageUrl) throw new Error("Image URL is required");

        let match = imageUrl.match(/\/upload\/(?:v\d+\/)?([^\.]+)/);
        if (!match || !match[1]) throw new Error("Invalid Cloudinary URL format");

        let publicId = match[1]; 

        let result = await cloudinary.uploader.destroy(publicId);

        return result;
    } catch (error) {
        console.error("Error deleting blog image from Cloudinary:", error);
        throw error;
    }
}

const storageBlogPic = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'blogpostPics', // Folder in Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
        public_id: (req, file) => file.fieldname + '-' + Date.now()
    }
});

const uploadBlogPic = multer({ storage: storageBlogPic });

module.exports = { cloudinary, uploadBlogPic, deleteBlogImageByBlogUrl };
