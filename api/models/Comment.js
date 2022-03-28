const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema([{

    idVideo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'videos'
    },
    student:{
        type: mongoose.Schema.Types.ObjectId,
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