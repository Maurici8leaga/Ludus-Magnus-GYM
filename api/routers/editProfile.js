const express = require('express');
const routerEditProfile = express.Router();
const User = require('../models/user');

routerEditProfile.post('/edit', async function (req, res, next){
    try {
        
        const {name, lastname, height, weight} = req.user 
        
        const userInfo = {};
        // userInfo.user = req.user.id;
        console.log('ESTO ES USERINFO ANTES->', userInfo)
        
        if(name) userInfo.name = name;
        if(lastname) userInfo.lastname = lastname;
        if(height) userInfo.height = height;
        if(weight) userInfo.weight = weight;

        console.log('ESTO ES USERINFO DESPUES->', userInfo)
        
        const user = await User.findById(req.user.id).select('-password');
        // const userId = user._id;
        const userUpdate = await User.findOneAndUpdate({_id: user._id}, {$set : userInfo}, {new: true});
        console.log('ESTO ES USERUPDATE->', userUpdate);
        
        res.json({message: 'User profile have been update successfully', userUpdate});
    } catch (error) {
        console.log('este es el error ->', error);
    }
});

module.exports = {routerEditProfile}