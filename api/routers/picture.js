const express = require('express');
const multer = require('multer');
const routerPicture = express.Router();
const path = require("path");
const fs = require('fs');
const Picture = require('../models/Picture');


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

routerPicture.post("/upload", upload.single('profile'), (req, res, next) => {

    console.log('ESTO ES REQ.FILE', req.file);
    //si pones "profile" en el postman en el key debe ir igual
    // try{
    //     var objImg = { 
    //         img: { data: fs.readFileSync(path.join(req.filedname + '/upload ' + file.originalname)), contentType: 'image/jpeg' }
    //     }

    //     console.log(objImg, 'ESTO ES OBJIMG'); 

        // Picture.create(objImg, (err, item) => {
        //     if(err) {
        //         console.log('ALGO PASO MAL', err)
        //     } else {
        //         item.save();
        //         res.json({message : 'New image added to the db!'})
        //         console.log(objImg, 'ESTO ES OBJIMG');
        //         //este sera la respuesta de retorno al usuario
        //     }
        // })
    // } catch (error) {
    //     console.log('algo salio mal', error);
    // }


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