import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getVideoById } from '../../actions/videos';
import CommentBox from '../pages/microComponent/CommentBox';
import CommentItem from '../pages/microComponent/CommentItem';
import { like, dislike, deleteComment } from '../../actions/videos';
import './scss/RoutinesType.scss';

const Video = ({ getVideoById, match, video, like, dislike, deleteComment }) => {

    useEffect(() => {
        getVideoById(match.params.id);
    }, [getVideoById, match.params.id]);

    const removeComment = (idVideo, commentId) => deleteComment(idVideo, commentId);
    // este arrow funtions se va a ejecutar si es llamado en un component Child, de esta manera conectamos entre component parent y child functions que puedan ser ejecutadas desde el child

    const { title, description, youtubeID, category, modo, _id, comment, likes } = video;

    const search = `https://www.youtube.com/embed/${youtubeID}`;
    // esta variable hara el request al link de youtube y podras acceder al video OJO se debe colocar "/embed" AJURO si no no agarra el video

    return comment !== undefined && likes !== undefined && (
        <div className="ui container">

            <h1 className="intro">Rutina de {category} con {modo} </h1>

            <div className="ui grid">
                <div className="ui row">
                    <div className="eleven wide column">
                        <div className="ui embed">
                            <iframe title="video player" src={search} />
                            {/* src permitira hacer el request al youtube para reproducir el video */}
                        </div>
                        <div className="ui segment">
                            <h4 className="ui header">{title}</h4>
                            <p>{description}</p>
                        </div>
                        <div className="ui fluid three item menu">
                            <button className="ui basic button" type="button" onClick={e => like(_id)}>
                                <i className="thumbs up outline icon" />
                                                        Like
                                    <span>
                                    {likes.length > 0 && (<span>  {likes.length}</span>)}
                                </span>
                            </button>

                            <button className=" ui basic button" type="button" onClick={e => dislike(_id)}>
                                <i className="thumbs down outline icon" />
                                                        Dislike
                            </button>

                            <button className="ui basic button">
                                <i className="comment alternate outline icon" />
                                                        Comentar
                                </button>
                        </div>
                        <hr />
                        <div>
                            {/* se debe colocar este siguiente dentro de un div porque si no da error */}
                            {comment.map((comments, index) => (
                                <CommentItem key={index} comments={comments} idVideo={_id} removeComment={removeComment} />
                                // se pasa "comments" como props AJURO para que pueda tener acceso a la data del comment en el otro component
                                // "removeComment" debe pasarse asi de manera de que este functions pueda ser llamada cuando sea ejecutada en el component Child
                            ))}
                        </div>
                        {/* se debe colocar este conditional ya que sin el el "map" da error por ende este permite que si en tal caso llega a existir un commentario, lo muestre si no, no muestre nada */}
                        <CommentBox idVideo={_id} />
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
    videoId: PropTypes.object,
    video: PropTypes.object
}

const mapStateToProps = state => ({
    video: state.video.videoId
});

export default connect(mapStateToProps, { getVideoById, like, dislike, deleteComment })(Video);