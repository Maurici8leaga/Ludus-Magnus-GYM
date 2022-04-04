const express = require('express');
const Authentication= require('../controllers/authentication');
const passportService = require('../services/passport');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});
const authRouter = express.Router();

// Sign In
authRouter.post('/signin', requireSignin, Authentication.signin);

// Sign Up
authRouter.post('/signup', Authentication.signup);

module.exports = { authRouter }
