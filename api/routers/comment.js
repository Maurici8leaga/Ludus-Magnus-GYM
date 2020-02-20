// HACE FALTA AUN EN ESTE COMPONENTE!!!!!!!!

const express = require('express');
const routerComment = express.Router();
const Comment = require('../models/Comment');
const User = require('../models/user');

// Crear un nuevo commentario
routerComment.post(`/video/${video.id.videoId}`, async function(req, res){
    try {
        const user = await User.findById(req.user.id).select('-password');

        const newComment = new Comment({
            text: req.body.text,
            name: user.name,
            user: req.user.id
        })

        const comment = await newComment.save();
        res.json(comment);

    } catch (error) {
        console.log(error.msg);
        res.status(500).send({ error: {msg: 'Server Error'}});
    }
});

// Mostrar todos los comment en el video
// FALTA LA RUTA DUDA AUN COMO HACERLA Y CONECTARLA
routerComment.get('/video/${video.id.videoId}', async (req, res) => {
    try {
        const comments = await Comment.find().sort({date: -1 });

        res.json(comments);
    } catch (error) {
        console.log(error.msg);
        res.status(500).send({ error: {msg: 'Server Error'}});
    }
});



module.exports = {routerComment};