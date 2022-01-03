const express = require('express');
const multer = require('multer');
const routerPicture = express.Router();
const path = require("path");
const fs = require('fs');
const PictureModal = require('../models/Picture');


// storage ingine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
        // este callback el 1er element es "null" es para cuando de error, luego le sigue el "fieldname" + la fecha con mili seg + path que sera el formato jpeg etc
        // esto se hace ya que si se maneja el mismo fieldname va a crear una coincidencia con el archivo interno y se duplicara
    }
})

const upload = multer({
    storage: storage,
        // indicamos que se almacene en donde dice la variable storage, que es el mismo lugar donde se guardo el primer file en hexadecimal
    limits: { fileSize: 100000 }
        // esto permitira colocar un limite a los bits de cada imagen , si supera esto dara error
})

routerPicture.use('/profile', express.static('upload/images'));

// Endpoint for choose the image profile 
routerPicture.get('/', (req, res) => {
    PictureModal.find({}, (err, items) => {
        if(err) {
            console.log('This is the error; ', err);
            res.status(500).send('An error ocurred');
        } else{
            res.render('PictureProfile', {items: items});
        }
    });
});

// endpoint to save de img into db
routerPicture.post("/upload", upload.single('picture-profile'), (req, res, next) => {
        // si se coloca aca 'picture-profile' en el key debe ir igual

        const name = `picture_${Date.now()}`;
        
        const objImg = {
            url: `/${name}.jpeg`,
            contentType: 'image/jpeg'
        }
        
        PictureModal.create(objImg, (err, item) => {
            if (err){
                console.log('This is the error', err);
            } else {
                item.save();
                res.json({message: 'A new picture had been add to db', item});
                console.log('se ha guardado una img' , item)
            }
        })
});

function errHandler(err, req, res, next){
    // esto lo recomienda multer de manera de tener un control en tal caso de llegar a tener un error
    if (err instanceof multer.MulterError){
        res.json({
            success: 0,
            message: err.message
        })
    }
}

routerPicture.use(errHandler);

module.exports = { routerPicture }