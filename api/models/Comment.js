const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema([{

    idVideo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'videos'
    },
    alumno:{
        type: mongoose.Schema.Types.ObjectId,
        // colocamos este "mongoose.SchemaTypes.ObjectId" para poder conectar esta Schema con el Schema del user
        ref: 'user'
    },
    text:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }

}]);

const ModelClass = mongoose.model('comment', CommentSchema);
module.exports = ModelClass;