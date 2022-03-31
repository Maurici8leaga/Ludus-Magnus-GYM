const express = require('express');
const routerEditProfile = express.Router();
const User = require('../models/user');

// Editing user information
routerEditProfile.put('/edit', async function (req, res, next){

    try {
        
        const {name, lastname, height, weight} = req.body        
        const userNewInfo = {};
        
        // adding new values to the new object
        if(name) userNewInfo.name = name;
        if(lastname) userNewInfo.lastname = lastname;
        if(height) userNewInfo.height = height;
        if(weight) userNewInfo.weight = weight;
        
        const user = await User.findById(req.user.id).select('-password');
        const userUpdate = await User.findOneAndUpdate({_id: user._id}, {$set : userNewInfo});
        const ProfileUser = await User.findOne({_id: req.user.id}).populate('avatar').select('-password');
        
        res.json({msg: 'User profile have been update successfully', userUpdate: ProfileUser});

    } catch (error) {
        console.error(error);
        res.status(500).send({error: {msg : 'An error has occurred. Server Error '}});
    }
});

module.exports = {routerEditProfile} 