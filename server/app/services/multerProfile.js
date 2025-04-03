// let multer = require('multer')
// let fs = require('fs')
// let path = require('path')

// let storageProfilePic = multer.diskStorage({
//     destination: "./uploads/profilePic/",
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

// let uploadProfilePic = multer({
//     storage: storageProfilePic,
//     limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
//     fileFilter: fileFilter
// });

// module.exports = { storageProfilePic, uploadProfilePic }

require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

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

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'profilePics', // Folder in Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
        public_id: (req, file) => file.fieldname + '-' + Date.now()
    },
});

const uploadProfilePic = multer({ storage });

async function deleteImageByUrl(imageUrl) {
    try {
        if (!imageUrl) throw new Error("Image URL is required");

        // Extract the public ID (removes 'upload/vXXXXXXXXXX/' and file extension)
        let match = imageUrl.match(/\/upload\/(?:v\d+\/)?([^\.]+)/);
        if (!match || !match[1]) throw new Error("Invalid Cloudinary URL format");

        let publicId = match[1];  // Extracted public ID
        console.log("Extracted Public ID:", publicId);

        // Attempt to delete the image from Cloudinary
        let result = await cloudinary.uploader.destroy(publicId);
        console.log("Cloudinary deletion response:", result);

        return result;
    } catch (error) {
        console.error("Error deleting Cloudinary image:", error);
        throw error;
    }
}

module.exports = { cloudinary, uploadProfilePic,deleteImageByUrl };
