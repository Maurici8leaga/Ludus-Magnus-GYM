const express = require('express');
const Authentication= require('../controllers/authentication');
const passportService = require('../services/passport');
const passport = require('passport');
const routerProfile = express.Router();
const User = require('../models/user');
// OJO AQUI FALTA SOLUCINAR EL TEMA DEL OBJECT "err" HAY QUE CAMBIARLO AQUI Y EN EL ACTIONS DE ESTE MISMO
routerProfile.get('/me', async function(req, res){
    try{
        const ProfileUser = await User.findOne({_id: req.user.id}).select('-password');
                // aca realizamos el llamado de toda la informacion almacenada del usuario, de manera poder acceder a ella y mostrarla cuando se acceda al profile
        if(!ProfileUser){
            return res.status(400).json({ error: {msg: 'No hay profile para este usuario'}});
        }
        res.json(ProfileUser); 
    }catch(error){
        console.error(error.msg);
        res.status(500).send({error: {msg : 'Server Error '}});
    }
});
module.exports = {routerProfile}
