import React, { useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getVideoById } from '../../actions/videos';
import CommentBox from '../pages/microComponent/CommentBox';
import CommentItem from '../pages/microComponent/CommentItem';
import { like, dislike, deleteComment, clearVideo } from '../../actions/videos';
import { loadToTop } from '../extras/helpers';
import Alert from '../extras/Alert';
import Spinner from '../extras/Spinner';

const Video = ({ getVideoById, match, videoObject, like, dislike, deleteComment, clearVideo }) => {

    useEffect(() => {
        if (match.params.id) {
            getVideoById(match.params.id);
        }
        loadToTop();

        return () => clearVideo();
        // esta funcion dentro del return es para limpiar el state de videoObject, de manera que cuando salgas y entres a otro video no se cargue imagenes o video del anterior video
        // clearVideo es un actions que se creo solo para vaciar el state despues de salir del component, esto es lo que viene haciendo un componentWillUnmount!! OJO
    }, [match.params.id, getVideoById, clearVideo]);
    // se debe colocar aqui dentro del array lo que venga del mapstate; actions, object en este caso, porque si no lanzara un warning

    // este arrow funtions se va a ejecutar si es llamado en un component Child, de esta manera conectamos entre component parent y child functions que puedan ser ejecutadas desde el child
    const removeComment = (commentId) => deleteComment({ commentId, idVideo: match.params.id });
    //aca dentro de la funcion enviamos como object "{}" los parametros commentId y idVideo para que en el actions pueda eliminar el comment del video
    // importante es que son enviados dentro de {} si son enviados asi tienen que ser llamados exactamente igual en el actions, si no llevaran {}
    // entonces el nombre que se le de aca y en el actions no es relevante pero si el orden en como son colocados, ya que eso influira en el actions y deberan ser colocados exactamente igual que aqui

    const { title, description, youtubeID, _id, comments, likes } = videoObject;

    const search = `https://www.youtube.com/embed/${youtubeID}`;
    // esta variable hara el request al link de youtube y podras acceder al video OJO se debe colocar "/embed" AJURO si no no agarra el video

    return !videoObject || !videoObject._id ? <Spinner /> : (
        // usamos este condicional para que cuando profile exista y su id tambien muestre el component si no muestre el spinner
        <div className="container-video">
            <div>
                <div className="ratio ratio-4x3">
                    {/* ratio es un class de bootstrap que tiene para los videos, y ratio-4x3 en este caso sera el tamaño que queramos que sea la pantalla del video */}
                    <ReactPlayer
                        url={search}
                        width='100%'
                        height='100%'
                        controls={true} //este control tiene que ir para que aparezca la barra de menu de youtube y se pueda adelantar el video o pausar o mutear
                    />
                    {/* url permitira hacer el request al youtube para poder reproducir el video */}
                </div>

                <div className="pantalla-dark-mate">
                    {/* colocamos este pantalla para que cubra todo el contenido de bajo del video y sea responsive para todos los divices */}
                    <div className="container-fluid py-3">
                        <div className="container ">
                            <div className="row">
                                {/* usamos row para colocar los elementos siguiente en la misma forma horizontal y en la misma linea */}
                                <div className="col-12 col-sm-9">
                                    {/* colocamos col-sm-9 para que ocupe el mayor espacio el title que el resto del contenido */}
                                    <h4 className="h5 fw-bold">{title}</h4>
                                </div>
                                <div className=" col-12 col-sm-3 ">
                                    {/* usamos col-sm-3 para que ocupe el minimo espacio del contenido */}
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
                                <hr className="rayita" />
                            </div>
                            <div className="container-md">
                                <p className="fs-6 text">{description}</p>
                            </div>
                        </div>
                    </div>

                    <div className="container-sm">
                        <Alert />
                        <hr className="rayita" />
                        {/* se necesita este condicional para que no de error al carga la pag */}
                        {comments && Array.isArray(comments) ? (
                            // el metodo Array.isArray retorna true si el elemento llega a ser en verdad un array si no retorna false
                            <div className="ms-5 pb-1 ">
                                {/* ms es el class de bootstrap para separar el elemento hacia la derecha */}
                                <p className="lead fw-bold">{comments.length}   Comment </p>
                            </div>
                        ) : (
                            <div className="ms-5 pb-1 ">
                                <p className="lead fw-bold"> Comment </p>
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
                        <hr className="rayita" />
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