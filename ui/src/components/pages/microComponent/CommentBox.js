import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../../actions/videos';

const CommentBox = ({ idVideo, alumno, addComment }) => {

    const onSubmit = async e => {
        e.preventDefault();
        // addComment({ text });
        // se agrega "idVideo" de manera que se pueda hacer el comentario en el comentario que queremos, y como 2do elemento
        // se pasa el "text" que sera lo escrito
        setText('');
        // se coloca "setText" en blanco para que despues del comment se vuelva a vaciar el textarea
        CloseUp();
        // llamamos aca para cuando se de comentar este se reinicie y se cierre
        setText({...text, idVideo, alumno})
        console.log('esto es text', text)
    }

    const [open, setOpen] = React.useState(false);
    // este state es para y solo para que el div y el textarea se intercambien

    const CloseUp = () => {
        // creamos este functions de manera de poder ejecutar otras 2 funciones a la misma vez cuando sea llamada
        setOpen(!open);
        setText('');
        setRow(1);
        // se coloca aqui esto de manera que despues o antes de escribir el row por defecto sea 1, si no se pondra muy grande
    }

    const [text, setText] = useState('');
    const [row, setRow] = useState(1);
    const [minRows, setMinRow] = useState(1);
    const [maxRows, setMaxRows] = useState(10);

    const handleChange = e => {
        // con este handle vamos hacer que el textarea sea dinamico en tamaño, los valores que tienen son de una FORMULA asi que lo que unico que va a variar son
        // el numero de row, minRow y maxRow el resto debe quedar asi
        const textareaLineHeight = 24;

        const previousRows = e.target.rows;
        e.target.rows = minRows; // reset number of rows in textarea

        const currentRows = ~~(e.target.scrollHeight / textareaLineHeight);
        // aqui el simbolo ~~ es un dobdle tilde operator sirve para convertir el resultado en un numero entero para que de un numero de lineas enteras

        if (currentRows === previousRows) {
            e.target.rows = currentRows;
        }

        if (currentRows >= maxRows) {
            e.target.rows = maxRows;
            e.target.scrollTop = e.target.scrollHeight;
            // de esta forma cuando se tenga que expandir este aumente segun la cantidad de texto 
        }

        setText(e.target.value);
        // setText({...text, [e.target.name]: e.target.value});
        setRow(currentRows < maxRows ? currentRows : maxRows);
    }

    const TextAreaFunction = () => {
        // ESTO ES UN FUNCTION QUE DEVUELVE UN JSX
        return (
            <>
                <textarea
                    className="textarea-style"
                    name="text"
                    cols="130"
                    rows={row}
                    placeholder=" Agrega un comentario ..."
                    value={text}
                    onChange={handleChange}
                    required
                >
                </textarea>

                <hr className="rayita" />

            </>
        )
    }

    const DivFunction = () => {
        // ESTO ES UN FUNCTION QUE DEVUELVE UN JSX
        return (
            <>
                <div className="LookeLikeTextArea" placeholder="Agrega un comentario..." onClick={() => setOpen(!open)}></div>

            </>
        )
    }

    const buttonCommentCancel = () => {
        return (
            <>
                <div className="Header-Comment-Cancel-button">
                    <input type="submit" className="boton -claro" value="Comentar" />
                    {/* debe colocarse un INPUT no DIV porque si no, nunca se hara el request en el comentario */}

                    <button className="boton -oscuro" onClick={() => CloseUp()}>
                        Cancel
                    </button>
                </div>

            </>
        )
    }


    return (
        <div >
            <div className="container-commentBox" >

                <div className="Header-ProfilePicture-CommentForm">

                    <div className="container-profilePicture">
                        <span>
                            {/* se usa "span" ya que este no requiere un "hrf" para lo que necesitamos que haga */}
                            <img className="profilePicture" alt='avatar' src="https://www.vippng.com/png/detail/416-4161690_empty-profile-picture-blank-avatar-image-circle.png" />
                            {/* los tag img deben tener un "alt" prop ya que sin el dara problemas con los browser*/}
                        </span>
                    </div>

                    <div className="sera">
                        <form className="form-comment" onSubmit={e => onSubmit(e)}>
                            {open ? TextAreaFunction() : DivFunction()}
                            {/* se crea este operator conditional de manera que antes de hacer click el vea un div como textArea y luego de que haga click sea un textAreale for */}
                        </form>
                    </div>


                </div>

            </div>

            <div className="container-commentBox">
                {/* se coloca los buttons en otro container de manera que los botones no causen una diferencia de tamaño entre el div y el textarea del form */}
                <div >
                    <form className="form-comment" onSubmit={e => onSubmit(e)}>
                        {open ? buttonCommentCancel() : null}
                    </form>
                </div>
            </div>
        </div >
    );
}

CommentBox.propTypes = {
    addComment: PropTypes.func.isRequired,
}

export default connect(null, { addComment })(CommentBox);