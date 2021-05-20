const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const passport = require('passport');
const mongoose = require('mongoose');
const cors = require('cors');
const { authRouter } = require('./routers/auth');
const {routerProfile} = require('../api/routers/profile');
const {routerVideo} = require('./routers/videos');
const {routerComment} = require('./routers/comment');
const {routerPicture} = require('../api/routers/picture');
// const Authentication = require('../api/controllers/authentication');
// const requireSignin = passport.authenticate('local', {session: false});
const requireAuth = passport.authenticate('jwt', {session: false});


// configuracion MGDB
mongoose.connect('mongodb://localhost:27017/gymAuth', { useNewUrlParser: true } );
                            // se coloca el port "27017" que es por el cual el mongoose escucha

// middleware
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({type: '*/*'}));
app.use('/api', authRouter);
app.use('/api/profile', requireAuth, routerProfile);
app.use('/api/profile', requireAuth, routerPicture);
app.use('/api/videoList', requireAuth, routerVideo);
app.use('/api/video', requireAuth, routerComment);
// aqui debe ir el app.use con su require de manera que el endpoint pueda llamarse


const port = process.env.PORT || 3001;
const server = http.createServer(app);
                        //este "app" podria cambiar OJO 
server.listen(port);
console.log('server listen on:', port);