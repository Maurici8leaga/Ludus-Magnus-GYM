const Authentication= require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false});
                            // el token genera una sesion por defecto, se le coloca false para negarla

module.exports = function(app){
    app.get('/', requireAuth, function(req, res){
        res.send({hi : 'there'});
                // OJO AQUI ADENTRO PODRA IR EL CODIGO DE LA PAG  como el intro etc
    });

    app.post('/signup', Authentication.signup);
}