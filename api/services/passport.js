const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require ('passport-jwt').ExtractJwt;

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