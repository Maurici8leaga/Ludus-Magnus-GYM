// esta ruta se separa de RouterPicture ya que esta no necesita Authentication porque si no da error
const express = require('express');
const routerPictureStatic = express.Router();

// Get images
// se debe usar express.static para archivos como en este caso imagenes/ de esta forma podemos llamar la img del folder
routerPictureStatic.use('/', express.static('upload/images'));
                                //  'upload/images' es el folder donde estan contenidas las img guardadas


module.exports = { routerPictureStatic }
