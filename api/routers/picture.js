const express = require('express');
const multer = require('multer');
// const Picture = require('../models/Picture');
const routerPicture = express.Router();
// const fs = require('fs');

// const storage = multer.diskStorage({
//     destination: function(req, res, cb){
//         cb(null, 'uploads/')
//     }
// });

// const upload = multer({ storage: storage });

const upload = multer({
    dest:'./upload/images',
});

routerPicture.route('/imgdata').post(upload.single('file'), function(req, res){
    // upload.single(file) le dice a multer que procese la imagen entrante y la almacene en un archivo local 
    console.log(req.file);
});
        // const newPicture = new Picture;
        // console.log(newPicture, 'ESTE ES NEW PICTURE');
        // newPicture.img.data = fs.readFileSync(req.file.path);
        //                     // fs permite leer el archivo almacenado de forma local, para luego ser almacenado 
        // newPicture.img.contentType = 'image/png';
        // newPicture.save();
        // console.log(newPicture, 'ESTO ES NEW PICTURE');
        // res.json({ msg: 'Nueva imagen agregada al DB'});
        // console.log(res.json, 'ESTO ES RES.JSON');

        // if(error){
        //     res.status(400).send({error});
        //     console.log(error, 'ESTE ES EL ERROR');
        // }

    // } catch(error) {
    //     console.log(error.msg);
    //     res.status(500).send({ error });
    // }
// }).get(function (req, res) {
//     Picture.findOne({}, 'img createdAt', function(err, img){
//         // con findOne traera la ultima imagen subida al user
//         if (error)
//             res.status(500).send({ error: { msg: 'Server Error' } });

//             res.contentType('json');
//             // colocando contentTypre(json) la estamos mandando de la misma forma exacta de como la estamos obteniendo del DB
//             res.send(img);
//             console.log(img, 'ESTO ES LO QUE ES img');
//     }).sort({ createdAt: 'desc' });
            // este createdAt permitira ordenar las img ya que es la hora exacta en la fue salvada la imagen

module.exports = {routerPicture}
