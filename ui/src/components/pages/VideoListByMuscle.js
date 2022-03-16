import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ListVideo from '../pages/microComponent/ListVideo';
import { getListVideos, clearVideoList } from '../../actions/videos';
import { Link } from 'react-scroll';
import Alert from '../extras/Alert';
import Spinner from '../extras/Spinner';

// hay que colocar "match" para que pueda llamarse dentro de la funcion
const VideoListByMuscle = ({ getListVideos, match, muscleList, history, clearVideoList }) => {
    // este "muscleList" es creado en este component viene del mapState el cual se le denomina el nombre ahi
    // en el se va almacenar la data optenida del request al backend, por ende es EL QUE DEBE LLAMARSE PARA OPTENER LA LISTA DE VIDEOS

    useEffect(() => {
        getListVideos(match.params.muscle);
        // dentro de esta funcion hay que colocar "match.params" + "el nombre que del estado o objeto donde este el musculo en este caso"
        // de manera que al hacer el request este agregue los params al URL
        return () => clearVideoList();
        // esta funcion dentro del return es para limpiar el state de videoList, de manera que cuando salgas y entres a otra categoria de musculo no se cargue datos y videos del anterior musculo
        // clearVideoList es un actions que se creo solo para vaciar el state despues de salir del component, esto es lo que viene haciendo un componentWillUnmount!! OJO

    }, [getListVideos, match.params.muscle, clearVideoList]);
    // debe colocarse dentro del [] el "getListVideos",  "match.params.muscle" y el "clearVideoList" para que no de muestre el alerta de error constantemente

    return !muscleList || !muscleList.length > 0 ? <Spinner /> : (
        // colocamos este condicional para que muestre el component cuando exista muscleList y adicional a eso cuando el lenght  del muscleList sea mayor a 0. Si no mostrara el spinner
        <div className="container-muscle">
            <div className="pantalla-videoList">
                <div className="pantalla-videoList-darkBlur">
                    <Alert />

                    <div className="text-center extra-mt-responsive white-letter">
                        <h1 className="display-2 highlight-title">Video List</h1>

                        <p className="h3 highlight-title2 mt-5">Choose the video you want to watch</p>
                    </div>

                    <div className="arrow text-center mt-5">
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
            </div>

            <div className="pantalla-videoList">
                {/* se repite el background porque en este caso queremos que el background se mantenga pero el contenido no se sobre ponga con la primera parte de la pag */}
                <div className="wrap-page overflow-scroll">
                    {/* IMPORTANTE se coloca aqui el overflow-scroll para que en esta parte de la pag se pueda bajar y ver todo el contenido sin importar si es muy largo o no */}
                    <div className="container ">
                        <div className="row" id="exerciseList" >
                            {muscleList.map((musculo, index) => (
                                // se debe colocar este "musclelist.map" para poder acceder a los OBJETOS DENTRO DEL ARRRAY MUSCLELIST
                                <div className="col-12 " key={index}>
                                    {/* se coloca 12 para que todo sea una sola fila de cada tipo de ejercicio */}
                                    {musculo.video.length === 0 ? null : (
                                        <div>
                                            {/* se usa estos <> para que dentro de este conditional se pueda colocar ambos "musculo.modo" y "musculo.video.map" mas abajo y no de error a renderizar */}
                                            <div className="h1 texto-positive my-3">
                                                {musculo.modo}
                                                <hr />
                                                {/* // aqui se puede acceder facil a "modo" ya que el si es un objeto directo de "muscleList" por eso va fuera del map */}
                                            </div>
                                            <div className="d-flex flex-row  row-cols-lg-3 row-cols-md-2 row-cols-sm-1 row-cols-1  overflow-scroll">
                                                {/* para que los videos se coloquen horizontalmente se coloca d-plex y flex-row */}
                                                {/* se coloca varios row-cols para hacer responsive los videos y especificar que cuando la pantalla cambie de tamaño ya sea grande o pqña varien los numero de videos , row-cols-1 ES PARA CUANDO SE SUPERE EL BREAKPOINT  DE SM*/}
                                                {/* el overflow-scroll es para que cuando se oculten los videos pq la pantalla es pqña entonces se pueda desplazar horizontal para ver el resto de los videos */}
                                                {musculo.video.map((info, youtubeID) => (
                                                    // video es un array, por ende SIEMPRE PARA ACCEDER AL OBJETO DE UN ARRAY HAY QUE COLOCAR "loquesea.map" para poder entrar a ella, en este caso es "musculo.video"
                                                    <div className="d-flex mb-4" key={youtubeID}>
                                                        <ListVideo video={info} history={history} />
                                                        {/* aca video es el "prop" que se va a pasar al micro component Listvideo y info debe ir adentro para que pueda conectar la informacion que tiene el objeto con el childComponent (ListVideo) */}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
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
    }).filter( ({video}) => video.length);
    // con este ultimo filter hacemos que los videos que esten dentro de muscleList sean solo los que tienen mayor a 0 de lenght para que no
    // muestre categorias con videos vacios. Entonces la funcion dentro al retornar true va aplicar los cambios no se coloca el "> 0" ya que
    // si video.lenght da 0 va a retornar false y por defecto no va a mostrar.
    // cabe destacar que las operaciones de array se pueden concatenar

    return { muscleList };
    // en este muscleList se almacena ahora los videos ORDENADAMENTE, retorna 6 objetos de los cuales tiene 3 videos c/u
};

export default connect(mapStateToProps, { getListVideos, clearVideoList })(VideoListByMuscle);

