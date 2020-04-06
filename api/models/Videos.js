const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideosSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    link:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true,
    },
    imagen:{
        type: String,
        require: true
    },
    modo:{
        type: String,
        require: true
    },
    profesor:{
        type: String,
        require: true
    },
    duracion:{
        type: String,
        require: true
    },
    idioma:{
        type: String,
        require: true
    }
});

module.exports = Videos = mongoose.model('videos', VideosSchema);