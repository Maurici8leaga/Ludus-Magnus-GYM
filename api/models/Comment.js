const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        // hace referencia a un "ref" ¿? enfocado a un users?¿
        ref: 'user'
        // este "ref" hace referencia a la coleccion a la cual hacemos referencia, donde "user" se encuentra los datos del usuario
    },
    name: {
        type: String
    },
    text: {
        type: String,
        required: true
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                                // se especifica el "ObjectId" de manera que el usuario no pueda dar mas de 1 like
                // hace referencia a un "ref" ¿? enfocado a un users?¿
                ref: 'user'
            }
        }
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                // hace referencia a un "ref" ¿? enfocado a un users?¿
                ref: 'user'
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String
            },
            date: {
                // aca se monstrara la hora del comentario apenas fue creado
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = Comment = mongoose.model('comment', CommentSchema);
// De esta manera logramos unir en una sola linea, crear el model , se le pasara al Schema al mongoose para que sepa que existe un nuevo Schema
// y tambien se logra exportar a la vez el Comment