const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideosSchema = new Schema({
    idVideo:{
        type: mongoose.Schema.Types.ObjectId
    },
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
    image:{
        type: String,
        require: true
    },
    mode:{
        type: String,
        require: true
    },
    trainer:{
        type: String,
        require: true
    },
    length:{
        type: String,
        require: true
    },
    language:{
        type: String,
        require: true
    },
    likes: [
        {
            student: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            }
        }
    ]
});

module.exports = Videos = mongoose.model('videos', VideosSchema);