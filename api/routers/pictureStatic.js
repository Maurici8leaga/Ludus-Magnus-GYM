// this route don't need an authentication because it'll produced an error on the project
const express = require('express');
const routerPictureStatic = express.Router();

// Get images and storing images statically ways
routerPictureStatic.use('/', express.static('upload/images'));

module.exports = { routerPictureStatic }
