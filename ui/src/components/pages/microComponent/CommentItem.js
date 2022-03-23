import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../../actions/videos';

const CommentItem = ({ comment, removeComment, auth }) => {

    const { text, date, alumno, _id } = comment;
    const { name, lastname } = alumno

    const avatarImage = () => {

        const { avatar } = alumno;

        // Avatar default
        let avatarUrl = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
        // colocamos let en vez de const ya que let tiene mayor scope que const este puede ser llamado mas adentro de otros elementos

        // Avatar picture custom
        if (typeof avatar === 'object') {
            // typeof es un operator que indica dentro de un string lo que es el operador en este caso 'avatar' = 'object'. Entonces el condicional se indica si es exactamente eso retorna lo siguiente
            avatarUrl = `http://localhost:3001/api/avatar${avatar.url}`
            return (
                <img className="avatar-mini me-5" alt="avatar" src={avatarUrl} />
                // me es el class de bootstrap para empujar los elementos hacia la izquierda en este caso
            );
        }
        return (
            <img className="avatar-mini me-5" alt="avatar" src={avatarUrl} />
        );

    }

    return (
        <div className="container-commentBox"> 
            <div className="d-flex flex-row">
                {/* usamos d-flex flex-row porque queremos que la foto y el contenido esten horizontalmente paralelos */}
                <div className="avatar-container-profile-commentBox">
                    <span className="avatar-mini me-5">
                        {/* se usa "span" ya que este no requiere un "hrf" para lo que necesitamos que haga */}
                        {avatarImage()}
                    </span>
                </div>

                <div className="d-flex flex-column mx-4">
                    {/* usamos flex-column porque queremos que el contenido este encima del uno con el otro*/}
                    <p className="fs-6 fw-bold">{name} {' '}{lastname}</p>
                    <div className="fs-6">
                        {text}
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="fs-6 gray-letter">
                            {/* fs-6 es el tamañod el font que le estamos dando al las letras */}
                            <Moment format="DD/MM/YYYY">{date}</Moment>
                        </div>
                        {alumno && alumno._id === auth.user._id ? (
                            <button onClick={e => removeComment(_id)} type='button' className="boton -negative-delete">
                                {/* colocamos dentro del "refresh" el "idVideo" para eliminarlo del video y "_id" para eliminarlo del usuario */}
                                <i className="far fa-trash-alt fs-6"></i>
                            </button>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

CommentItem.proptype = {
    idVideo: PropTypes.string.isRequired,
    comment: PropTypes.object.isRequired,
    removeComment: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

const mapStatetoProps = state => ({
    auth: state.auth.user,
    // se coloca ".user" al final ya que es en el que esta el objeto donde dentro esta el _id que necesitamos
})

export default connect(mapStatetoProps, { deleteComment })(CommentItem);
