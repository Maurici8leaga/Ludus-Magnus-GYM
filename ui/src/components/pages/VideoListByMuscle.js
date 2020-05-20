import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ListVideo from '../pages/microComponent/ListVideo';
import { getListVideos } from '../../actions/videos';

// hay que colocar "match" para que pueda llamarse dentro de la funcion
const VideoListByMuscle = ({ getListVideos, match, muscleList, history}) => {
    // este "muscleList" es creado en este component viene del mapState el cual se le denomina el nombre ahi
    // en el se va almacenar la data optenida del request al backend, por ende es EL QUE DEBE LLAMARSE PARA OPTENER LA LISTA DE VIDEOS

    useEffect(() => {
        getListVideos(match.params.muscle);
        // dentro de esta funcion hay que colocar "match.params" + "el nombre que del estado o objeto donde este el musculo en este caso"
        // de manera que al hacer el request este agregue los params al URL
    }, [getListVideos, match.params.muscle]);
    // debe colocarse dentro del [] el "getListVideos" y el "match.params.muscle" para que no de muestre el alerta de error constantemente


    return (
        <div className="ui container">

        <h1 className="intro">Lista de Videos de </h1>

            <h3>Escoge cual ejercicio quieres hacer hoy</h3>

            <div className="three wide column">
                {muscleList.map((video, youtubeID, ) => {
                    return (
                        <ListVideo key={youtubeID} video={video} history={history}/>
                                                // hay que pasar "video" y "history" como  props de manera que el otro componente
                                                // tenga acceso a las propiedades del video como "title" etc.. y history demanera que
                                                // pueda tener acceso y poder redenrizar a donde le digamos
                    );
                })}
            </div>
        </div>
    );
}

VideoListByMuscle.propTypes = {
    getListVideos: PropTypes.func.isRequired,
    videoList: PropTypes.object
    // ya que "videoList" es el objeto donde se almacena la data que queremos, debemos AGREGARLO AQUI
}

const mapStateToProps = state => ({
    muscleList: state.video.videoList
    // OOOJO  CON ESTOO este "muscleList" puede llamarse como uno quiera, en el se va a almacenar la data que esta opteniendo atravez del state
    // que esta dentro del reducer "video" en el cual "videoList" es el state a utilizar! ENTIENDELO
})

export default connect(mapStateToProps, { getListVideos })(VideoListByMuscle);
