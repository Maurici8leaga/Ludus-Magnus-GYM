import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../../actions/videos';

const CommentBox = ({ idVideo, addComment, profile }) => {


    const onSubmit = async e => {
        e.preventDefault();
        // se envia al actions el text para enviar lo que escribio, el idVideo para saber en que video comento y el alumno que es el id del user para saber quien lo escribio
        addComment({ text, idVideo, alumno: profile._id });
                        // le asignamos a "alumno" el valor de "profile._id" de esta manera, asi se le puede asignar a una variable el valor de una propiedad de un objeto 
        setText('');
        // se coloca "setText" en blanco para que despues del comment se vuelva a vaciar el textarea
        CloseUp();
        // llamamos aca para cuando se de comentar este se reinicie y se cierre
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
                <div className="LookeLikeTextArea" placeholder="Agrega un comentario..." onClick={() => setOpen(!open)}>
                </div>

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

    const avatarImage = () => {

        const { avatar } = profile;

        // Avatar default
        let avatarUrl = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
        // colocamos let en vez de const ya que let tiene mayor scope que const este puede ser llamado mas adentro de otros elementos

        // Avatar picture custom
        if (typeof avatar === 'object') {
            // typeof es un operator que indica dentro de un string lo que es el operador en este caso 'avatar' = 'object'. Entonces el condicional se indica si es exactamente eso retorna lo siguiente
            avatarUrl = `http://localhost:3001/api/avatar${avatar.url}`
            return (
                <img className="profilePicture" alt="avatar" src={avatarUrl} />
            );
        }
        return (
            <img className="profilePicture" alt="avatar" src={avatarUrl} />
        );

    }


    return (
        <div >
            <div className="container-commentBox" >

                <div className="Header-ProfilePicture-CommentForm">

                    <div className="container-profilePicture">
                        <span className="profilePicture">
                            {/* se usa "span" ya que este no requiere un "hrf" para lo que necesitamos que haga */}
                            {avatarImage()}
                            {/* los tag img deben tener un "alt" prop ya que sin el dara problemas con los browser*/}
                        </span>
                    </div>

                    <div className="">
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
    profile: PropTypes.object
}

const mapStatetoProps = state => ({
    profile: state.profile.ProfileUser
})

export default connect(mapStatetoProps, { addComment })(CommentBox);