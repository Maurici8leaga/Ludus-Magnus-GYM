import React, { useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getVideoById } from '../../actions/videos';
import CommentBox from '../pages/microComponent/CommentBox';
import CommentItem from '../pages/microComponent/CommentItem';
import { like, dislike, deleteComment } from '../../actions/videos';
import { loadToTop } from '../extras/helpers';
import Alert from '../extras/Alert';

const Video = ({ getVideoById, match, video, like, dislike, deleteComment, alumno }) => {

    useEffect(() => {
        getVideoById(match.params.id);
        loadToTop();
    }, [getVideoById, match.params.id]);

    const removeComment = (idVideo, commentId) => deleteComment(idVideo, commentId);
    // este arrow funtions se va a ejecutar si es llamado en un component Child, de esta manera conectamos entre component parent y child functions que puedan ser ejecutadas desde el child

    const { title, description, youtubeID, category, modo, _id, comment, likes } = video;

    const search = `https://www.youtube.com/embed/${youtubeID}`;
    // esta variable hara el request al link de youtube y podras acceder al video OJO se debe colocar "/embed" AJURO si no no agarra el video

    return comment !== undefined && likes !== undefined && (
        <div className="container-video">
            <Alert/>

            {/* <h1 className="grande texto-positive">Rutina de {category} con {modo} </h1> */}

            <div>
                <div className="screen1">
                    <div className="screen2">
                        <ReactPlayer
                            url={search}
                            width='100%'
                            height='100%'
                            controls = {true} //este control tiene que ir para que aparezca la barra de menu de youtube y se pueda adelantar el video o pausar o mutear
                        />
                        {/* url permitira hacer el request al youtube para poder reproducir el video */}
                    </div>
                </div>
                <div className="container-description">
                    <div className="container-description-texto">
                        <div className="Header-Title-Video">
                            <h4 className="title-Description">{title}</h4>
                            <div>

                                <button className="like-dislike-button" type="button" onClick={e => like(_id)}>
                                    <i className="fas fa-thumbs-up"></i>
                                    <span>
                                        {likes.length > 0 && (<span>  {likes.length}</span>)}
                                    </span>
                                </button>

                                <button className="like-dislike-button" type="button" onClick={e => dislike(_id)}>
                                    <i className="far fa-thumbs-down"></i>
                                </button>
                            </div>
                        </div>
                        <p>{description}</p>
                    </div>
                </div>

                <div className="container-description">
                    <hr className="rayita1" />
                    <div className="container-Ncomments">
                        {/* <p>{comment.length}   comentarios </p> */}
                    </div>
                    {/* se debe colocar este siguiente dentro de un div porque si no da error */}
                    {/* {comment.map((comments, index) => (
                        <CommentItem key={index} comments={comments} idVideo={_id} removeComment={removeComment} />
                        // se pasa "comments" como props AJURO para que pueda tener acceso a la data del comment en el otro component
                        // "removeComment" debe pasarse asi de manera de que este functions pueda ser llamada cuando sea ejecutada en el component Child
                    ))} */}
                    {/* se debe colocar este conditional ya que sin el el "map" da error por ende este permite que si en tal caso llega a existir un commentario, lo muestre si no, no muestre nada */}
                    <CommentBox idVideo={_id} alumno={alumno.user._id}/>
                    <hr className="rayita2" />
                </div>
            </div>
        </div>
    );
}

Video.propTypes = {
    getVideoById: PropTypes.func.isRequired,
    like: PropTypes.func.isRequired,
    dislike: PropTypes.func.isRequired,
    // videoId: PropTypes.object,
    video: PropTypes.object,
    alumno: PropTypes.object
}

const mapStateToProps = state => ({
    video: state.video.videoId,
    alumno: state.auth.user
});

export default connect(mapStateToProps, { getVideoById, like, dislike, deleteComment })(Video);