const Authentication= require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false});
                            // el token genera una sesion por defecto, se le coloca false para negarla
const requireSignin = passport.authenticate('local', {session: false});
                // esto con finalidad de que la sesion no se inicie automaticamente al abrir la pag , y este deba pasar por seguridad primero

module.exports = function(app){
    app.get('/', requireAuth, function(req, res){
        res.send({hi : 'there'});
                // OJO AQUI ADENTRO PODRA IR EL CODIGO DE LA PAG  como el intro etc
    });
    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup);
}