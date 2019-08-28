const User = require('../models/user');

exports.signup = function(req, res, next){

    const email= req.body.email;
    const password= req.body.password;

    if(!email || !password){
        return res.status(422).send({ error: 'Debes colocar email y password'});
    }

    // veremos si un usario tiene un email existente
    User.findOne({ email: email} , function(err, existingUser){
        if(err) {return next(err);}
    
    // si el el email del usuario existe, regresa un error
        if(existingUser) {
            return res.status(422).send({ error: 'El email ya existe'});
                    // se envia el mensaje del error con un status 422 en el cual no ejecuta la solicitud
        }
    // si el email del usuario no existe, se crea y se guarda en la "data-base"
        const user = new User ({
            email: email,
            password: password
        });

        user.save(function(err){
            if(err) {return next(err);}

            // se responde que el usuario fue creado
            res.json(user);
        });
    });
}