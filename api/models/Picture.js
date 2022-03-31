const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PictureSchema = new Schema(

    {
        type: mongoose.Schema.Types.ObjectId,
        url: { type: String },
        contentType: String
    },

    {
        timestamps: true
    }
);

const ModelClass = mongoose.model('picture', PictureSchema);

module.exports = ModelClass;