const express = require('express');
const multer = require('multer');
const routerPicture = express.Router();
const path = require("path");
const fs = require('fs');
const PictureModal = require('../models/Picture');
const User = require('../models/user');


// storage ingine
const storage = multer.diskStorage({

    destination: './upload/images',
    filename: (req, file, cb) => {

        // file name with date and extension of the file
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

// setting up the multer functions
const upload = multer({

    storage: storage,
    limits: { fileSize: 100000 },

    // only accept files with extension jpeg
    fileFilter: function(req, file, cb){

        if (path.extname(file.originalname) !== '.jpeg')
        {
            return cb(null, false);
        } else {
            cb(null, true);
        }
    }
})

// endpoint to save de img into db
routerPicture.post("/upload", upload.single(`picture-profile`), async function (req, res, next) {

    try {

        // if exist a error
        if (!req.file) {
            return res.status(400).send({error : 'There was an error uploading the image, please make sure the file type is jpeg'});
          }

        // storing the image values inside this object 
        const objImg = {
            url: `/${req.file.filename}`,
            contentType: `${req.file.mimetype}`
        }

        const user = await User.findById(req.user.id).select('-password');

        // creating the image
        const picture = await PictureModal.create(objImg);
        
        // updating the user whit the new picture
        const avatarId = picture._id;
        const userId = user._id;
        const userUpdate = await User.findOneAndUpdate({ _id: userId }, { avatar: avatarId });
        
        res.json({ msg: 'Picture profile added successfully', picture });

    } catch (error) {
        console.log('This is the error->', error);
        res.status(500).send({error: {msg : 'Server Error '}});
    }
});

// Handler error if occure an error with  multer
function errHandler(err, req, res, next) {
    if (err instanceof multer.MulterError) {
        res.json({
            success: 0,
            message: err.message
        })
    }
}

routerPicture.use(errHandler);

module.exports = { routerPicture }