const express = require('express');
const routerComment = express.Router();
const User = require('../models/user');
const Videos = require('../models/Videos');
const Comment = require('../models/Comment');

// Crear un nuevo commentario
routerComment.post('/comment', async (req, res) => {
    // PARA QUE SE PUEDA MANDAR EL REQUEST AL BACK DEBE TENER authorization-token-user Y Content-Type 
    try {

        
        let comment = await Comment.create(req.body);
        // en esta variable se espera que desde el front se mande aparte del text el alumno ObjectId y el de idVideo, eso estara dentro de req.body
         comment = await comment.populate(['idVideo', 'alumno']).execPopulate();
        // aca hacemos populate de idVideo y alumno, PERO SE NECESITA DE execPopulate para poder tambien hacer este populate ya que gracias a el
        // se puede hacer populate de documents ya existentes, en este caso comment ya que primero fue creado y luego se hace populate
        res.json({message: 'Comentario creado', comment});

    } catch (error) {
        console.log('ESTO ES EL ERROR EN POST COMMENT->',error.msg);
        res.status(500).send({ error: { msg: 'Server Error' } });
    }
});

// Elimina un comentario
routerComment.delete('/comment/:videoId/:commentId', async (req, res) => {
    try {

        const video = await Videos.findById({ _id: req.params.videoId });
        // de esta forma extraemos el comentario

        const commentario = video.comment.find(commentario => String(commentario._id) === req.params.commentId);
        //esto lo que hara es buscar en los comentarios el "id" del comentario que se quiere eliminar y asegurarse de que corresponda a ese video
        // se coloca "String" de manera de asegurar de que (commentario_id) sea un string

        if (!commentario) {
            // de esta forma verificamos de que el comentario exista
            return res.status(404).json({ msg: 'Comentario no existe' });
        }

        // verificacion del usuario, de manera que pueda eliminarse solo por la persona que lo creo
        // HAY QUE RECALCAR QUE SE USA "alumno" YA QUE EN EL models de comment esta llamado asi
        if (commentario.alumno.toString() !== req.user.id) {
            // el "toString" permite que el "commentario.alumno" se convierta en un string si no se coloca esto no se lograra conseguir el Match de usuario logiado con usuario que creo el commentario
            return res.status(401).json({ msg: 'Usuario no autorizado' });
        }

        const removeComment = video.comment.map(commentario => commentario.alumno.toString()).indexOf(req.user.id);
        // el "indexOf" su funcion es localizar dentro del array de los comment que se encuentra dentro del video, y el "req.user.id" es el especifico id del comment que se va a eliminar

        video.comment.splice(removeComment, 1);
        // el "splice" lo que hace es remover del array el elemento indicado en este caso "removeComment", el numero "1" indica que se removera 1 solo elemento si este se coloca en 0 NO SE ELIMINARA NINGUNO
        await video.save();
        res.json(video);
        // se coloca res.json(video) porque se quiere pasar el video completo sin el comentario eliminado, forzandolo a refrescar el videoById

    } catch (error) {
        console.log(error.msg);
        res.status(500).send({ error });
    }
});

// Dar Like a un video
routerComment.put('/like/:id', async (req, res) => {
    try {

        const videoId = await Videos.findById({ _id: req.params.id });

        // Verificar si ya le ha dado like anteriormente

        // lo que hara este "filter()" es filtrar de la lista de los que hallan dado like en ese post
        // buscara un match para ver si ya el usuario le ha dado like antes, si es asi eso retorna "true" o 1
        // y si da 1 es mayor que 0 entonces se ejecutara lo siguiente
        if (videoId.likes.filter(like => like.alumno.toString() === req.user.id).length > 0) {
            // el "toString" permite que el "like.alumno" se convierta en un string si no se coloca esto no se lograra conseguir el Match el usuario logueado y el que hizo like
            return res.status(400).json({ msg: 'Ya le haz dado like' });
        }

        videoId.likes.unshift({ alumno: req.user.id });
        // esto lo que hara es que si el usuario no le habia dado like, entonces el "unshift" empujara de primero en orden el like para que quede registrado
        await videoId.save();
        res.json(videoId);
        // se coloca solo "videoId" ya que el es un objecto, y en el front necesitamos este objecto para refrescar los likes

    } catch (error) {
        console.log(error.msg);
        res.status(500).send({ error: { msg: 'Server Error' } });
    }
});

// Dar Dislike a un video
routerComment.put('/dislike/:id', async (req, res) => {
    try {

        const videoId = await Videos.findById({ _id: req.params.id });

        // Verificar si el usuario ya le ha dado like anteriormente 
        // a diferencia del anterior, en este si el lenght del "toString" con el "req.user.id" es igual a 0
        // entonces es porque no le ha dado like aun al video
        if (videoId.likes.filter(like => like.alumno.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: 'No le haz dado like aun' });
        }

        const removeLike = videoId.likes.map(like => like.alumno.toString()).indexOf(req.user.id);
        // el "indexOf" su funcion es localizar dentro del array de los likes que se encuentra dentro del post, y el "req.user.id" 
        // es el especifico id del like que se va a eliminar
        videoId.likes.splice(removeLike, 1);
        // el "splice" lo que hace es remover del array el elemento indicado en este caso "removeLike", 
        //  el numero "1" indica que se removera 1 solo elemento si este se coloca en 0 NO SE ELIMINARA NINGUNO

        await videoId.save();
        res.json(videoId);
        // se coloca solo "videoId" ya que el es un objecto, y en el front necesitamos este objecto para refrescar los dislikes

    } catch (error) {
        console.log(error.msg);
        res.status(500).send({ error: { msg: 'Server Error' } });
    }
});


module.exports = { routerComment };