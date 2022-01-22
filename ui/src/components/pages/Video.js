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

const Video = ({ getVideoById, match, videoObject, like, dislike, deleteComment, alumno }) => {

    useEffect(() => {
        getVideoById(match.params.id);
        loadToTop();
    }, [match.params.id, getVideoById]);
            // coloco getVideoById aqui adentro porque si no da un warning indicando que getVideoById tiene un missing dependency

    // este arrow funtions se va a ejecutar si es llamado en un component Child, de esta manera conectamos entre component parent y child functions que puedan ser ejecutadas desde el child
    const removeComment = (commentId) => deleteComment({ commentId, idVideo: match.params.id });
    //aca dentro de la funcion enviamos como object "{}" los parametros commentId y idVideo para que en el actions pueda eliminar el comment del video
    // importante es que son enviados dentro de {} si son enviados asi tienen que ser llamados exactamente igual en el actions, si no llevaran {}
    // entonces el nombre que se le de aca y en el actions no es relevante pero si el orden en como son colocados, ya que eso influira en el actions y deberan ser colocados exactamente igual que aqui

    const { title, description, youtubeID, _id, comments, likes } = videoObject;

    const search = `https://www.youtube.com/embed/${youtubeID}`;
    // esta variable hara el request al link de youtube y podras acceder al video OJO se debe colocar "/embed" AJURO si no no agarra el video

    return (
        <div className="container-video">
            <div>
                <div className="screen1">
                    <div className="screen2">
                        <ReactPlayer
                            url={search}
                            width='100%'
                            height='100%'
                            controls={true} //este control tiene que ir para que aparezca la barra de menu de youtube y se pueda adelantar el video o pausar o mutear
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
                                        {likes && likes.length ? (<span>{likes.length}</span>) : <span>{` `}0</span>}
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
                    <Alert />
                    <hr className="rayita1" />
                    {/* se necesita este condicional para que no de error al carga la pag */}
                    {comments && Array.isArray(comments) ? (
                        // el metodo Array.isArray retorna true si el elemento llega a ser en verdad un array si no retorna false
                        <div className="container-Ncomments">
                            <p>{comments.length}   comentarios </p>
                        </div>
                    ) : (
                        <div className="container-Ncomments">
                            <p> comentarios </p>
                        </div>
                    )}
                    {/* se debe colocar este siguiente dentro de un div porque si no da error */}
                    {comments && Array.isArray(comments) ? (
                        comments.map((comment, index) => (
                            <CommentItem key={index} comment={comment} removeComment={removeComment} />
                            // se pasa "comment" como props AJURO para que pueda tener acceso a la data del comment en el otro component
                            // "removeComment" debe pasarse asi de manera de que este functions pueda ser llamada cuando sea ejecutada en el component Child
                        ))
                    ) : null}
                    {/* se debe colocar este conditional ya que sin eso el "map" da error por ende este permite que si en tal caso llega a existir un commentario, lo muestre si no, no muestre nada */}
                    <CommentBox idVideo={_id} />
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
    videoObject: PropTypes.object,
    alumno: PropTypes.object
}

const mapStateToProps = state => ({
    videoObject: state.video.video,
    alumno: state.auth.user
});

export default connect(mapStateToProps, { getVideoById, like, dislike, deleteComment })(Video);