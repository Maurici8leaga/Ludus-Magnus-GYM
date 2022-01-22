const express = require('express');
const Authentication= require('../controllers/authentication');
const passportService = require('../services/passport');
const passport = require('passport');
const routerProfile = express.Router();
const User = require('../models/user');

routerProfile.get('/me', async function(req, res){
    try{
            // Hacemos request de la info del usuario y ademas hacemos un refresh al user de esta forma si tiene un cambio se habra act 
        const ProfileUser = await User.findOne({_id: req.user.id}).populate('avatar').select('-password');
                //lo que hace populate aqui es remplazar la ruta que se le especifique que es en este caso user y picture 
                // para que la apropiedad del user llamada avatar en vez de que aparezca el objectId aparezca la documentacion completa

        if(!ProfileUser){
            return res.status(400).json({ error: {msg: 'No hay profile para este usuario'}});
        }
        res.json(ProfileUser); 
    }catch(error){
        console.error(error);
        res.status(500).send({error: {msg : 'Server Error '}});
    }
});
module.exports = {routerProfile}
