const express = require('express');
const routerVideo = express.Router();
const Videos = require('../models/Videos');
const Comment = require('../models/Comment');
// se debe  colocar tal cual el nombre como se creo el model en el Schema

// Get video by category
routerVideo.get('/', async function(req, res){
    try{
        // RECUERDA EL NOMBRE QUE LE DES A ESTA VARIABLE SERA EL OBJETO QUE USARAS EN TUS REDUCER Y COMPONENT
        const videoList = await Videos.find({category: req.query.category});
                                                    // el "query" en dentro de "req.query.category" podemos obtener todos los parametros que vienen dentro del URL en este caso sera el de la category
        if(!videoList){
            return res.status(400).json({ error: {msg: 'No hay videos'}});
        }
        res.json(videoList); 
    }catch(error){
        console.error(error.msg);
        res.status(500).send({error: {msg : 'Server Error '}});
    }
});

// Get video by Id
routerVideo.get('/:id', async function(req, res){
    try{
        // RECUERDA EL NOMBRE QUE LE DES A ESTA VARIABLE SERA EL OBJETO QUE USARAS EN TUS REDUCER Y COMPONENT
        const video = await Videos.findById({_id: req.params.id}).lean();
                                            // aqui el video va a ser encontrado por el "_id" este ser el id que le dio mongo a cada video almacenado pero tambien se podria colocar un id manual a cada video y llamarlo en vez del id por default
        if(!video){
            return res.status(400).json({ error: {msg: 'No existe este video'}});
        }

        // se busca los comentarios que esten relacionados con este video
        const comments = await Comment.find({idVideo: req.params.id}).populate([{path: 'alumno', populate :{ path: 'avatar'}}]).lean();
        // usamos "find" para encontrar el id del video dentro del collections de comment, ya que "findById" solo se usa para obtener el id del collection osea ID del comment
                                                        // hacemos populate de esta manera para poder acceder a las propiedades de alumno, y dentro de alumno acceder a las propiedades de avatar
                                                        // ASI SE HACE POPULATE A LA PROPIEDAD DE UNA PROPIEDAD DE UN OBJETO 2level
                                                                // el "lean" ayuda a que el query sea mucho mas rapido y menos memory al ser procesado, en resumenes palabras quita varias propiedades y funciones para que el file sea mas ligero
                                                                // en este caso eso nos ayuda que al hacer el file mas ligero nos permita poder mas adelante añadirle una nueva propiedad al object de video
       
        // añadimos la propiedad comments en el object video
        video.comments = comments;
        // console.log('ESTOS SON LOS COMMENTATIOS', comments);

        res.json(video);
        // console.log('ESTO ES VIDEO',video ) 
    }catch(error){
        console.error(error.msg);
        res.status(500).send({error: {msg : 'Video no encontrado, verifique de nuevo'}});
    }
});



module.exports = {routerVideo}
