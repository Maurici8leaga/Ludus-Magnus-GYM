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
        console.log('ESTO ES FILENAME DENTRO', req.user);
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
        // este callback el 1er element es "null" es para cuando de error, luego le sigue el "fieldname" + la fecha con mili seg + path.extname sera el formato o extension en este caso jpeg etc
        // esto se hace ya que si se maneja el mismo fieldname va a crear una coincidencia con el archivo interno y se duplicara
    }
})

const upload = multer({
    storage: storage,
    // indicamos que se almacene en donde dice la variable storage, que es el mismo lugar donde se guardo el primer file en hexadecimal
    limits: { fileSize: 100000 }
    // esto permitira colocar un limite a los bits de cada imagen , si supera esto dara error
})


// endpoint to save de img into db
routerPicture.post("/upload", upload.single('picture-profile'), async function (req, res, next) {
    // si se coloca aca 'picture-profile' en el key debe ir igual, ademas este sera el nombre inicial de las img
    try {

        const name = `picture-profile_${Date.now()}`;
        // colocamos esto para poder diferenciar el nombre de cada img de manera hacerlo dinamica
        console.log('ESTO ES DENTRO DE ROUTER PICTURE', req.user)

        const objImg = {
            // en este caso como vamos a contener las img en un folder solo debemos colocar el url y el contentype 
            url: `/${name}.jpeg`,
            contentType: 'image/jpeg'
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
        
        res.json({ message: 'A new picture had been add to db', picture });
        // en este caso solo pasamos "picture" y 'refreshUser 'porque es lo que necesitamos para este endpoint        

    } catch (error) {
        console.log('This is the error->', error);
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