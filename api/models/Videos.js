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
    },
    comment: [
        // se coloca dentro de [] ya que van haber varios commentarios, entonces sera un array de varios objetos que seran comentarios
        {
            alumno:{
                type: mongoose.Schema.Types.ObjectId,
                // colocamos este "mongoose.SchemaTypes.ObjectId" para poder conectar esta Schema con el Schema del user
                ref: 'user'
            },
            text:{
                type: String,
                required: true
            },
            name:{
                type: String,
            },
            lastname:{
                type: String,
            },
            date:{
                type: Date,
                default: Date.now
            }
        }
    ],
    likes: [
        {
            alumno: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            }
        }
    ]
});

module.exports = Videos = mongoose.model('videos', VideosSchema);