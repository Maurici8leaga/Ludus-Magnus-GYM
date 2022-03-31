const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require ('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// we create a local strategy but will find it with it's email
const localOptions = { usernameField: 'email' };

// verify the provided email and password
const localLogin = new LocalStrategy(localOptions, function(email, password, done){

    User.findOne({ email: email}, function(err, user){
        if(err) {return done(err);}

        // If the user does not exist.
        if(!user) {return done(null, false);}

        // comparing the password with the encrypted password
        user.comparePassword(password, function(err, isMatch){
            if(err) {return done(err);}

            // if the match does not exist
            if(!isMatch) {return done(null, false);}

            return done(null, user);
        });
    });
});

// settings for Jwt Strategy
const jwtOptions = {

    jwtFromRequest: ExtractJwt.fromHeader('authorization-token-user'),

    // extracting the security phrase
    secretOrKey: config.secret 
};

// creating the JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){

    User.findById(payload.sub, function(err, user){
        if(err) {return done(err, false);}

        // if the user doesn't exist yet, save it; otherwise it doesn't save it and doesn't send an error
        if(user) {
            done(null, user);
        }else{
            done(null, false);
        }  
    });
});

passport.use(jwtLogin);
passport.use(localLogin);