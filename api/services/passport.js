const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require ('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// se crea un startegy local
const localOptions = { usernameField: 'email' };
                // se le especifica que el field es "email", ya que por defecto busca siempre un name
                                    // el "password" lo optiene una vez que el "LocalStrategy" consigue el email
const localLogin = new LocalStrategy(localOptions, function(email, password, done){
// el objetivo de este es verificar el email y password ingresado, si esta lo deja entrar 

    User.findOne({ email: email}, function(err, user){
        if(err) {return done(err);}

        if(!user) {return done(null, false);}

        // comparacion de password con el password encryptado
        user.comparePassword(password, function(err, isMatch){
            // el "comparePassword" va a comparar el "password" con el resultado que de en la function
            if(err) {return done(err);}

            if(!isMatch) {return done(null, false);}

            return done(null, user);
        });
    });
});

// opciones de configuracion para el Jwt Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
        // lo que hace este "jwtFromRequest" es que cada vez que se solicite y se quiera el passport cuando se entre este debe fijarse en el encabezado de autorizacion del token
    secretOrKey: config.secret 
    // esto extraera nuestra string de seguridad
};

// Se crea el JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){

    User.findById(payload.sub, function(err, user){
        if(err) {return done(err, false);}

        if(user) {
            done(null, user);
        // si el usario existe no envia error y indica el usuario creado
        }else{
            done(null, false);
        // si no se encuentra el usuario no muestra el usuario y tampoco envia error
        }  
    });
});

// Hay que indicarle al passport que use la strategy
passport.use(jwtLogin);
passport.use(localLogin);