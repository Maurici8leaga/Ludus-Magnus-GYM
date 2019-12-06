const express = require('express');
const Authentication= require('../controllers/authentication');
const passportService = require('../services/passport');
const passport = require('passport');
const routerProfile = express.Router();
const User = require('../models/user');

routerProfile.get('/', async function(req, res){
    try{
        const ProfileUser = await User.findOne({_id: req.user.id}).select('-password');
                // aca realizamos el llamado de toda la informacion almacenada del usuario, de manera poder acceder a ella y mostrarla cuando se acceda al profile
        if(!ProfileUser){
            return res.status(400).json({ msg: 'There is no profile fot this user'});
        }
        res.json(ProfileUser); 
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error ');
    }
});
module.exports = {routerProfile}
