import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../../actions/videos';

const CommentItem = ({ comment, removeComment, auth }) => {

    const { text, date, student, _id } = comment;
    const { name, lastname } = student

    const avatarImage = () => {

        const { avatar } = student;

        // Default avatar
        let avatarUrl = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

        // Custom avatar picture
        if (typeof avatar === 'object') {
            avatarUrl = `http://localhost:3001/api/avatar${avatar.url}`
            return (
                <img className="avatar-mini me-5" alt="avatar" src={avatarUrl} />
            );
        }
        return (
            <img className="avatar-mini me-5" alt="avatar" src={avatarUrl} />
        );

    }

    return (
        <div className="container-commentBox"> 
            <div className="d-flex flex-row">
                <div className="avatar-container-profile-commentBox">
                    <span className="avatar-mini me-5">
                        {avatarImage()}
                    </span>
                </div>

                <div className="d-flex flex-column mx-4">
                    <p className="fs-6 fw-bold">{name} {' '}{lastname}</p>
                    <div className="fs-6">
                        {text}
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="fs-6 gray-letter">
                            <Moment format="DD/MM/YYYY">{date}</Moment>
                        </div>
                        {student && student._id === auth.user._id ? (
                            <button onClick={e => removeComment(_id)} type='button' className="boton -negative-delete">
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
})

export default connect(mapStatetoProps, { deleteComment })(CommentItem);
