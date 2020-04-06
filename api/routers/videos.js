const express = require('express');
const routerVideo = express.Router();
const Videos = require('../models/Videos');
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
        const videoId = await Videos.findById({_id: req.params.id});
                                            // aqui el video va a ser encontrado por el "_id" este ser el id que le dio mongo a cada video almacenado pero tambien se podria colocar un id manual a cada video y llamarlo en vez del id por default
        if(!videoId){
            return res.status(400).json({ error: {msg: 'No existe este video'}});
        }
        res.json(videoId); 
    }catch(error){
        console.error(error.msg);
        res.status(500).send({error: {msg : 'Video no encontrado, verifique de nuevo'}});
    }
});



module.exports = {routerVideo}
