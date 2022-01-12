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
        const userUpdate = await User.findOneAndUpdate({_id: user._id}, {$set : userNewInfo});
        // $set va ayudar a remplazar los nuevos valores dentro de userNewInfo con los valores ya existentes del user y los va a remplazar por los nuevos

        const ProfileUser = await User.findOne({_id: req.user.id}).populate('avatar').select('-password');
        // volvemos a poner lo mismo en el profile routers porque necesitamos que los datos del user esten populate con el avatar para que actualice el user en su totalidad
                                                                            // IMPORTANTE EXCLUIR EL PASSWORD A LA HORA DE ENVIAR LOS DATOS
        
        res.json({message: 'User profile have been update successfully', userUpdate: ProfileUser});
                                    // aca ponemos "userUpdate: Profiler" para que solo se envie los datos que cambiaron el resto quede intacto
    } catch (error) {
        console.log('este es el error ->', error);
    }
});

module.exports = {routerEditProfile} 