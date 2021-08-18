var multer = require('multer');
var path = require('path');

// this is just to test locally if multer is working fine.
const localStorage = multer.diskStorage({
    destination: (req, res, next) => {
        next(null, global.CONFIGS.uploadPath)
    },
    filename: (req, file, next) => {
        next(null, Date.now() + '-' + file.originalname)
    }
});

// This function is use for upload file
const UPLOAD = {
    singleImageUpload: multer({
        storage: localStorage,
        fileFilter: function (req, file, next) {
            // Allowed extensions
            var fileTypes = /jpeg|jpg|png|pdf|gif/;
            // Check extention
            var extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
            // Check mime type
            var mimeType = fileTypes.test(file.mimetype);
            if (mimeType && extname) {
                next(null, true)
            } else {
                next('Only images/docs are allowed', null)
            }
        }
    })
};

module.exports = UPLOAD;