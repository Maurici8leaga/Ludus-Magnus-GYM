import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../../actions/videos';

const CommentItem = ({ idVideo, comments, removeComment, auth}) => {

    const { text, name, lastname, date, alumno, _id } = comments;

    return (
        <div className="ui comments">
            <div className="comment">
                <span className="avatar">
                    <img alt="avatar" src="https://www.vippng.com/png/detail/416-4161690_empty-profile-picture-blank-avatar-image-circle.png" />
                </span>
                <div className="content">
                    <p className="author">{name} {' '}{ lastname}</p>
                    <div className="text">
                        {text}
                    </div>
                    <div className="metadata">
                        <Moment format="DD/MM/YYYY">{date}</Moment>
                    </div>
                    {alumno === auth.user._id ? (
                        <button onClick={e => removeComment(idVideo, _id)} type='button' className="ui red button">
                            {/* colocamos dentro del "refresh" el "idVideo" para eliminarlo del video y "_id" para eliminarlo del usuario */}
                            <i className="trash alternate outline icon" />
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
