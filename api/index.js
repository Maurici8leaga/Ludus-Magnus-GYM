const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

// configuracion MGDB
mongoose.connect('mongodb://localhost:27017/gymAuth', { useNewUrlParser: true } );
                            // se coloca el port "27017" que es por el cual el mongoose escucha

// middleware
app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'}));
router(app);


const port = process.env.PORT || 3000;
const server = http.createServer(app);
                        //este "app" podria cambiar OJO 
server.listen(port);
console.log('server listen on:', port);