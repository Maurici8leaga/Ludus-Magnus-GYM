import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../../actions/videos';

const CommentItem = ({ idVideo, comments, removeComment, auth }) => {

    const { text, name, lastname, date, alumno, _id, comment } = comments;
    return (
        <div className="container-commentBox">
            <div className="Header-ProfilePicture-Name">
                <div className="container-profilePicture">
                    <span>
                        {/* se usa "span" ya que este no requiere un "hrf" para lo que necesitamos que haga */}
                        <img className="profilePicture" alt='avatar' src="https://www.vippng.com/png/detail/416-4161690_empty-profile-picture-blank-avatar-image-circle.png" />
                        {/* los tag img deben tener un "alt" prop ya que sin el dara problemas con los browser*/}
                    </span>
                </div>
                <p className="title-Comment">{name} {' '}{lastname}</p>
            </div>

            <div className="data-Comment">
                <div>
                    {text}
                </div>
                <div className="Header-dates-deleteButton">
                    <div className="dates">
                        <Moment format="DD/MM/YYYY">{date}</Moment>
                    </div>
                    {alumno === auth.user._id ? (
                        <button onClick={e => removeComment(idVideo, _id)} type='button' className="boton -negative-delete">
                            {/* colocamos dentro del "refresh" el "idVideo" para eliminarlo del video y "_id" para eliminarlo del usuario */}
                            <i className="far fa-trash-alt"></i>
                        </button>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

CommentItem.proptype = {
    idVideo: PropTypes.string.isRequired,
    comments: PropTypes.object.isRequired,
    removeComment: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

const mapStatetoProps = state => ({
    auth: state.auth.user,
    // se coloca ".user" al final ya que es en el que esta el objeto donde dentro esta el _id que necesitamos
})

export default connect(mapStatetoProps, { deleteComment })(CommentItem);
