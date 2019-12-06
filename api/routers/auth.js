const express = require('express');
const Authentication= require('../controllers/authentication');
const passportService = require('../services/passport');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});
const authRouter = express.Router();

    // aca solo se le coloca "/signIn o Up" ya que en el "index.js" tiene puesto el "/api"
authRouter.post('/signin', requireSignin, Authentication.signin);
authRouter.post('/signup', Authentication.signup);
module.exports = { authRouter }
