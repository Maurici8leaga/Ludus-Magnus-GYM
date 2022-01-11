const express = require('express');
const routerEditProfile = express.Router();
const User = require('../models/user');

routerEditProfile.put('/edit', async function (req, res, next){
    // como vamos a editar algunos datos del profile es mejor usar PUT
    try {
        
        const {name, lastname, height, weight} = req.body
        // se coloca aca req.body ya que el es el texto nuevo con los datos a cambiar del user
        
        const userNewInfo = {};
        
        // se mete en el nuevo obj los nuevos valores ingresados
        if(name) userNewInfo.name = name;
        if(lastname) userNewInfo.lastname = lastname;
        if(height) userNewInfo.height = height;
        if(weight) userNewInfo.weight = weight;
        
        const user = await User.findById(req.user.id).select('-password');
        const userUpdate = await User.findOneAndUpdate({_id: user._id}, {$set : userNewInfo}, {new: true});
        // $set va ayudar a remplazar los nuevos valores dentro de userNewInfo con los valores ya existentes del user y los va a remplazar por los nuevos
        
        res.json({message: 'User profile have been update successfully', userUpdate});
        consolo.log('ESTE ES EL USERUPDATE', userUpdate);
    } catch (error) {
        console.log('este es el error ->', error);
    }
});

module.exports = {routerEditProfile} 