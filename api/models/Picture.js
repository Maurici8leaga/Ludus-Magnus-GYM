const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PictureSchema = new Schema(
    {img: 
        { data: Buffer, contentType: String}
        // el type del data "Buffer" nos permite guardar imagenes como data en forma de arrays
    }, {
        timestamps: true
        // esto le indica al database que guarde y actualice automaticamente el tiempo de cada entrada que tenga
});

module.exports = Picture = mongoose.model('picture', PictureSchema);