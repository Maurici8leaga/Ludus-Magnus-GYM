const express = require('express');
const Authentication= require('../controllers/authentication');
const passportService = require('../services/passport');
const passport = require('passport');
const routerProfile = express.Router();
const User = require('../models/user');

// Getting the profile user
routerProfile.get('/me', async function(req, res){
    
    try{

        // finding the user and "populate" the avatar because we need all the info about the user as possible as we can
        const ProfileUser = await User.findOne({_id: req.user.id}).populate('avatar').select('-password');

        if(!ProfileUser){
            return res.status(400).json({ error: {msg: 'There is no profile for this user'}});
        }

        res.json(ProfileUser); 
    }catch(error){
        console.error(error);
        res.status(500).send({error: {msg : 'Server Error '}});
    }
});
module.exports = {routerProfile}
