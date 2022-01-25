import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ListVideo from '../pages/microComponent/ListVideo';
import { getListVideos } from '../../actions/videos';
import { Link } from 'react-scroll';
import Alert from '../extras/Alert';
import { loadToTop } from '../extras/helpers';
import Spinner from '../extras/Spinner';

// hay que colocar "match" para que pueda llamarse dentro de la funcion
const VideoListByMuscle = ({ getListVideos, match, muscleList, history }) => {
    // este "muscleList" es creado en este component viene del mapState el cual se le denomina el nombre ahi
    // en el se va almacenar la data optenida del request al backend, por ende es EL QUE DEBE LLAMARSE PARA OPTENER LA LISTA DE VIDEOS

    useEffect(() => {
        getListVideos(match.params.muscle);
        // dentro de esta funcion hay que colocar "match.params" + "el nombre que del estado o objeto donde este el musculo en este caso"
        // de manera que al hacer el request este agregue los params al URL
        loadToTop();
    }, [getListVideos, match.params.muscle]);
    // debe colocarse dentro del [] el "getListVideos" y el "match.params.muscle" para que no de muestre el alerta de error constantemente

                // para poder acceder a las propiedades de un array debe hacerse asi -> "muscleList[0]" ya que el value de los array son numericos
    return !muscleList || !muscleList[0].video.length > 0 ? <Spinner/> : (
        // colocamos este condicional para que muestre el component cuando exista muscleList y adicional a eso cuando los videos del muscleList sean mayor a 0. Si no mostrara el spinner
        <div className="container-muscle">

            <Alert />

            <div className="Image-container-exerciseTipe">
                <div className="Title-container">
                    <h1 className="highlight-title texto-secundary">Lista de Videos </h1>

                    <p className="highlight-title2">Escoge cual ejercicio quieres hacer hoy</p>
                </div>

                <div className="arrow">
                    <Link className="links-scss"
                        // este "LINK" se debe colocar para poder realizar el efecto scroll
                        activeClass="active"
                        // Este es para cuando el scroll llega al objetivo
                        to="exerciseList"
                        // aqui se especifica a cual objetivo quiere que vaya el scroll cuando se le de click
                        spy={true}
                        smooth={true}
                        // esta es la animacion del scrolling
                        offset={-70}
                        // para añadir unos px de mas para el efecto
                        duration={500}
                    // el tiempo de duracion del efecto scrolling
                    >
                        <i className="fas fa-angle-down" />
                    </Link>
                </div>
            </div>


            <div className="lista-ul" id="exerciseList" >
                {muscleList.map((musculo, index) => (
                    // se debe colocar este "musclelist.map" para poder acceder a los OBJETOS DENTRO DEL ARRRAY MUSCLELIST
                    <div key={index}>

                        {musculo.video.length === 0 ? null : (
                            <>
                                {/* se usa estos <> para que dentro de este conditional se pueda colocar ambos "musculo.modo" y "musculo.video.map" mas abajo y no de error a renderizar */}
                                <div className="grande texto-positive">
                                    {musculo.modo}
                                    {/* // aqui se puede acceder facil a "modo" ya que el si es un objeto directo de "muscleList" por eso va fuera del map */}
                                </div>
                                <>
                                    {musculo.video.map((info, youtubeID) => (
                                        // video es un array, por ende SIEMPRE PARA ACCEDER AL OBJETO DE UN ARRAY HAY QUE COLOCAR "loquesea.map" para poder entrar a ella, en este caso es "musculo.video"
                                        <div key={youtubeID}>
                                            <ListVideo video={info} history={history} />
                                            {/* aca video es el "prop" que se va a pasar al micro component Listvideo y info debe ir adentro para que pueda conectar la informacion que tiene el objeto con el childComponent (ListVideo) */}
                                        </div>
                                    ))}
                                </>
                            </>
                        )}

                    </div>
                ))}
            </div>

        </div>
    );
}

VideoListByMuscle.propTypes = {
    getListVideos: PropTypes.func.isRequired,
    videoList: PropTypes.object
    // ya que "videoList" es el objeto donde se almacena la data que queremos, debemos AGREGARLO AQUI
}

function mapStateToProps(state) {
    const { video: { videoList } } = state;
    // en videoList se encuentran los 9 videos del musculo seleccionado DESORDENADAMENTE
    const modos = new Set();
    // esta funcion(new Set) permite que (modos) sea un objeto en el cual se va almacenar cualquier tipo de valor en el
    videoList.forEach(v => modos.add(v.modo));
    // aca para cada video que se encuentra en "videoList" la funcion con (add) va agregar nuevos valores (en este caso un modo a cada video) en el objeto (modos) 
    const modosArray = ['Mancuerna', 'Maquina', 'Libre - Sin Pesas', 'Principiante', 'Intermedio', 'Avanzado'];
    // se crea este array de manera que se almancen los distintos NOMBRES de los modos de ejercicio
    const muscleList = modosArray.map(m => {
        const subVideos = videoList.filter(v => v.modo === m);
        // aca lo que se hace es crear un const para que organice los videos que se encuentran en "videoList", filter ayuda en este caso a que
        // si la funcion de adentro retorna "true" entonces mostrara los videos organizados. Dentro de la funcion esta que; si el nombre del modo es igual al modo del video (v.modo === m) 
        // entonces lo ordenara y lo almacenara ordenadamente
        return { modo: m, video: subVideos };
    });
    return { muscleList };
    // en este muscleList se almacena ahora los videos ORDENADAMENTE, retorna 6 objetos de los cuales tiene 3 videos c/u
};

export default connect(mapStateToProps, { getListVideos })(VideoListByMuscle);

