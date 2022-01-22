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
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
        // este callback el 1er element es "null" es para cuando de error, luego con lo siguiente son los elementos que multer le pondra al nombre
        // osea va a poner como NOMBRE FINAL DEL FILE la suma de "file.fieldname"+la fecha+ la extencion del documento en este caso jpeg
    }
})

const upload = multer({
    storage: storage,
    // indicamos que se almacene en donde dice la variable storage, que es el mismo lugar donde se guardo el primer file en hexadecimal
    limits: { fileSize: 100000 },
    // esto permitira colocar un limite a los bits de cada imagen , si supera esto dara error
    fileFilter: function(req, file, cb){
        // filter friltrara los file para que solo acepte el que se le indica
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
    // si se coloca aca 'picture-profile' en el key debe ir igual, ademas este sera el nombre inicial de las img
    try {

        if (!req.file) {
            // se crea este conditional para que cuando un file no sea aceptado por el filter de multer este devuelva un msj diciendo que solo se admite el indicado y no colapse la pag
            return res.status(400).send({error : 'There was an error uploading the image, please make sure the file type is jpeg'});
          }

        const objImg = {
            // en este caso como vamos a contener las img en un folder solo debemos colocar el url y el contentype 
            url: `/${req.file.filename}`,
                // aqui se coloca el nombre del file.filename (que viene de multer) que multer creo , entonces lo colocamos asi para que halla coincidencia en el folder con el del mongo y no tener problemas en request de la img en el front
            contentType: `${req.file.mimetype}`
        }

        const user = await User.findById(req.user.id).select('-password');
        //se colcar "User" porque de esta es la mongoose collection y "user" es el models
        const picture = await PictureModal.create(objImg);
        // con create se crea la imagen
        const avatarId = picture._id;
        const userId = user._id;
        // para el findOneAndUpdate se necesita los id's en este caso de picture y de user logiado
        const userUpdate = await User.findOneAndUpdate({ _id: userId }, { avatar: avatarId });
        // se coloca "_id" y "userId" porque en el es donde va a ver la relacion
        // se coloca avatar porque es el elemento que se va agregar al objt user
        // de esta forma se relaciona el user que esta siendo logiando con el picture que esta siendo subida
        
        res.json({ msg: 'Picture profile added successfully', picture });
        // en este caso solo pasamos "picture" y 'refreshUser 'porque es lo que necesitamos para este endpoint        

    } catch (error) {
        console.log('This is the error->', error);
        res.status(500).send({error: {msg : 'Server Error '}});
    }
});

function errHandler(err, req, res, next) {
    // esto lo recomienda multer de manera de tener un control en tal caso de llegar a tener un error
    if (err instanceof multer.MulterError) {
        res.json({
            success: 0,
            message: err.message
        })
    }
}

routerPicture.use(errHandler);

module.exports = { routerPicture }