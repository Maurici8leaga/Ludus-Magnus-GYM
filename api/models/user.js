const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Definiendo el model
const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
        // tipo de correo unico y con solo minuscula
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    sex: {
        type: String,
        required: true
    }
});

// Una vez guardado el user, se encriptara
userSchema.pre('save', function (next) {
    const user = this;

    bcrypt.genSalt(10, function (err, salt) {
        // la funcion del "10" es el numero de complejidad de encryptacion, esto puede ser mayor pero tomara mucho mas recursos y tardara mas en dar respuesta
        if (err) { return next(err); }

        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) { return next(err); }

            user.password = hash;
            // sobre escribira el password con el encrypt
            next();
            // guardara y ejecutara los cambios
        });
    });
});

// Este sera el proceso de "descriptacion" en la cual no se desencripta solo se compara el password creado por 1ra vez con el password ingresado del usuario 
userSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        // el "bcrypt" en conjunto con el compare, busca el "SALT" y el "HASH" creado 1ra vez este lo compara con el password que esta siendo recien ingresado y un SALT de seguridad
        // el "compare" va a tomar estos 2 y va a verificar que ambas password creadas coincidan y si es asi entonces corre el Match
        if (err) { return callback(err); }

        callback(null, isMatch);
    });
}

// Se debe crear el class del model
const ModelClass = mongoose.model('user', userSchema);
// se le pasara este Schema al mongoose para que sepa que existe un nuevo Schema

// Exportando el model
module.exports = ModelClass;