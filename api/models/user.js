const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Definiendo el model
const userSchema = new Schema({
    email: {type: String, unique: true, lowercase: true},
    // tipo de correo unico y con solo minuscula
    password: String
});

// Una vez guardado el user, se encriptara
userSchema.pre('save', function(next){ç
    const user = this;

    bcrypt.genSalt(10, function(err, salt){
        // OJO CON EL "10" BUSCAR SU FUNCION
        if(err) {return next(err);}

        bcrypt.hash(user.password, salt, null, function(err, hash){
            if(err) {return next(err);}

            user.password = hash;
            // sobre escribira el password con el encrypt
            next();
            // guardara y ejecutara los cambios
        });
    });
});

// Se debe crear el class del model
const ModelClass = mongoose.model('user', userSchema);
        // se le pasara este Schema al mongoose para que sepa que existe un nuevo Schema

// Exportando el model
module.exports = ModelClass;