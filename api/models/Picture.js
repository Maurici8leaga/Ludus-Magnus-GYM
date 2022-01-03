const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PictureSchema = new Schema(

    {
        type: mongoose.Schema.Types.ObjectId,
        url: { type: String },
        contentType: String
    },
    // el type del data "Buffer" nos permite guardar imagenes como data en forma de arrays
    {
        timestamps: true
    }
    // esto le indica al database que guarde y actualice automaticamente el tiempo de cada entrada que tenga
);

const ModelClass = mongoose.model('picture', PictureSchema);

module.exports = ModelClass;