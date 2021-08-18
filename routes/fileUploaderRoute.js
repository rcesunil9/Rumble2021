var express = require('express');
var router = express.Router();
var multer = require('multer');

var { webAuthenticated } = require("../middlewares/authenticators/webAuthHandlers");
var upload = require("../services/multer");

// ROUTES //
router.post("/singleImage", webAuthenticated, (req, res, next) => {
    var uploadFile = upload.singleImageUpload.single('singleImage');
    uploadFile(req, res, function (err) {
        if (req.fileValidationError) {
            return res.status(422).send({ error: true, message: req.fileValidationError });
        } else if (!req.file) {
            return res.status(422).send({ error: true, message: 'Please select an image to upload' });
        } else if (err instanceof multer.MulterError) {
            return res.status(422).send({ error: true, message: err });
        } else if (err) {
            return res.status(422).send({ error: true, message: err });
        } else {
            return res.status(200).send({ error: false, filename: global.CONFIGS.uploadAccessPath + req.file.filename });
        }
    });
});

module.exports = router;
