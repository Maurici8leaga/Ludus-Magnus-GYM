import React, { useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getVideoById } from '../../actions/videos';
import CommentBox from '../pages/microComponent/CommentBox';
import CommentItem from '../pages/microComponent/CommentItem';
import { like, dislike, deleteComment, clearVideo } from '../../actions/videos';
import Alert from '../extras/Alert';
import Spinner from '../extras/Spinner';

const Video = ({ getVideoById, match, videoObject, like, dislike, deleteComment, clearVideo }) => {

    useEffect(() => {
        if (match.params.id) {
            getVideoById(match.params.id);
        }
        return () => clearVideo();

    }, [match.params.id, getVideoById, clearVideo]);

    const removeComment = (commentId) => deleteComment({ commentId, idVideo: match.params.id });

    const { title, description, youtubeID, _id, comments, likes } = videoObject;

    // link to request video from youtube
    const search = `https://www.youtube.com/embed/${youtubeID}`;

    return !videoObject || !videoObject._id ? <Spinner /> : (

        <div className="container-video">
            <div>
                <div className="ratio ratio-4x3">
                    <ReactPlayer
                        url={search}
                        width='100%'
                        height='100%'
                        controls={true}
                    />
                </div>

                <div className="screen-dark-matte">
                    <div className="container-fluid py-3">
                        <div className="container ">
                            <Alert />
                            <div className="row">
                                <div className="col-12 col-sm-9">
                                    <h4 className="h5 fw-bold">{title}</h4>
                                </div>
                                <div className=" col-12 col-sm-3 ">
                                    <button className="like-dislike-button px-2" type="button" onClick={e => like(_id)}>
                                        <i className="fas fa-thumbs-up h6"></i>
                                        <span className="h6">
                                            {likes && likes.length ? (<span>{likes.length}</span>) : <span>{` `}0</span>}
                                        </span>
                                    </button>

                                    <button className="like-dislike-button px-2" type="button" onClick={e => dislike(_id)}>
                                        <i className="far fa-thumbs-down h6"></i>
                                    </button>
                                </div>
                                <hr className="decoLine" />
                            </div>
                            <div className="container-md">
                                <p className="fs-6 text">{description}</p>
                            </div>
                        </div>
                    </div>

                    <div className="container-sm">
                        <hr className="decoLine" />

                        {comments && Array.isArray(comments) ? (
                            <div className="ms-5 pb-1 ">
                                <p className="lead fw-bold">{comments.length}   Comment </p>
                            </div>
                        ) : (
                            <div className="ms-5 pb-1 ">
                                <p className="lead fw-bold"> Comment </p>
                            </div>
                        )}

                        {comments && Array.isArray(comments) ? (
                            comments.map((comment, index) => (
                                <CommentItem key={index} comment={comment} removeComment={removeComment} />
                            ))
                        ) : null}

                        <CommentBox idVideo={_id} />
                        <hr className="decoLine" />
                    </div>
                </div>
            </div>
        </div>
    );
}

Video.propTypes = {
    getVideoById: PropTypes.func.isRequired,
    like: PropTypes.func.isRequired,
    dislike: PropTypes.func.isRequired,
    videoObject: PropTypes.object,
}

const mapStateToProps = state => ({
    videoObject: state.video.video,
});

export default connect(mapStateToProps, { getVideoById, like, dislike, deleteComment, clearVideo })(Video);