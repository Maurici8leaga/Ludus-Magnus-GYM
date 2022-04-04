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
const {routerPictureStatic} = require('../api/routers/pictureStatic');
const {routerEditProfile} = require('../api/routers/editProfile');
const requireAuth = passport.authenticate('jwt', {session: false});


// MGDB configuration
mongoose.connect('mongodb://localhost:27017/gymAuth', { useNewUrlParser: true } );

// middleware
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());
app.use('/api', authRouter);
app.use('/api/profile', requireAuth, routerProfile, routerEditProfile);
// <- both of these routes have different purpose ->
app.use('/api/profile', requireAuth, routerPicture);
app.use('/api/avatar',  routerPictureStatic);
// <- this route does not need "requireAuth" because it need to have access to the images that it has
app.use('/api/videoList', requireAuth, routerVideo);
app.use('/api/video', requireAuth, routerComment);


const port = process.env.PORT || 3001;
const server = http.createServer(app);
server.listen(port);
console.log('server listen on:', port);