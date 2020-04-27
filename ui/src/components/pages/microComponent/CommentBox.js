import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {addComment} from '../../../actions/videos';

const CommentBox = ({idVideo, addComment}) => {

    const [text, setText] = useState('');

    const onSubmit = async e => {    
        e.preventDefault();
        addComment(idVideo, {text});
        // se agrega "idVideo" de manera que se pueda hacer el comentario en el comentario que queremos, y como 2do elemento
        // se pasa el "text" que sera lo escrito
        setText('');
        // se coloca "setText" en blanco para que despues del comment se vuelva a vaciar el textarea
    }
    
    return(
        <div className="ui comments">
            <div>
                <h3>Comentarios</h3>
            </div>

            <form className="ui reply form" onSubmit={e => onSubmit(e)}>
                <div className="field">
                    <textarea 
                    name="text" 
                    cols="10" 
                    rows="3" 
                    placeholder="Escribe tu comentario" 
                    value={text}
                    onChange={e => setText(e.target.value)}
                                // "e.target.value" sera el texto escrito por eso se pasa adentro, sin el no se puede escribir en el textarea
                    required>
                    </textarea>
                </div>
                <div>
                    <input type="submit" className="ui inverted orange basic button" value="Comentar"/>
                    {/* debe colocarse un INPUT no DIV porque si no, nunca se hara el request en el comentario */}
                </div>

            </form>

        </div>
    );
}

CommentBox.propTypes = {
    addComment: PropTypes.func.isRequired,
}

export default connect(null, {addComment}) (CommentBox);