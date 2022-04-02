import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-scroll';
// scroll se descargo y se usa en este componente para hacer un efecto en la pag de desplazamiento
import Alert from '../extras/Alert';
import Abs from '../img/abs.png';
// dato curioso, si no se coloca el "name" de la img en mayuscula no agarra
import Bicep from '../img/bicep.jpg';
import Espalda from '../img/espalda.jpeg';
import Hombro from '../img/hombro.jpg';
import Pecho from '../img/pecho.jpg';
import Pierna from '../img/pierna.png';
import Tricep from '../img/tricep.jpeg';
import Yoga from '../img/Yoga.jpg';
import { getProfile } from '../../actions/profile';
import Spinner from '../extras/Spinner';

const RoutinesType = ({ history, getProfile, profile }) => {
    // se debe colocar "history" aqui como props para poder tener acceso a el y hacer el redireccionamiento 

    useEffect(() => {
        getProfile();
    }, [getProfile]);

    const [, setMuscle] = useState('');

    const lista = [
        { musculo: 'BICEP', picture: Bicep },
        { musculo: 'ABS', picture: Abs },
        { musculo: 'BACK', picture: Espalda },
        { musculo: 'SHOULDER', picture: Hombro },
        { musculo: 'CHEST', picture: Pecho },
        { musculo: 'LEG', picture: Pierna },
        { musculo: 'TRICEP', picture: Tricep },
        { musculo: 'YOGA', picture: Yoga }
    ];
    // esta sera la lista de los posibles ejercicios que el usuario puede acceder

    const buttonMuscle = (muscle) => {
        setMuscle({ ...muscle });
        // al ejecutar la funcion de "click" este permitira que cuando se seleccione, este "setMuscle" tome y almacene en el state "muscle"
        history.push(`/exercises/${muscle}`);
    }

    const muscleList = () => (
        // el JSX siempre debe ir en parentesis!
        <div className="container-muscle">
            <div className="screen-muscleTipe"> 
                <div className="screen-muscleTipe-darkBlur">
                    <Alert />

                    <div className="text-center extra-mt-responsive white-letter">
                        <h1 className="display-2 highlight-title ">Muscle Type </h1>
                        {/* display-2 es mayor que el class h1 por eso lo usamos aca, highlight sera un class creado para darle stilo a las letras */}

                        <p className="h3 highlight-title2 mt-5">Choose the muscle you want to workout</p>
                    </div>

                    <div className="arrow text-center mt-5">
                        <Link className="links-scss"
                            // este "LINK" se debe colocar para poder realizar el efecto scroll
                            activeClass="active"
                            // Este es para cuando el scroll llega al objetivo
                            to="muscleList"
                            // aqui se especifica a cual objetivo quiere que vaya el scroll cuando se le de click
                            spy={true}
                            smooth={true}
                            // esta es la animacion del scrolling
                            offset={-70}
                            // para añadir unos px de mas para el efecto
                            duration={250}
                        // el tiempo de duracion del efecto scrolling
                        >
                            <i className="fas fa-angle-down" />
                        </Link>
                    </div>
                </div>
            </div>

            <div>
                <div className="row row-cols-1 row-cols-md-2">
                    {/* row-cols-1 especifica que cuando sea muy peq la pantalla sera 1 sola img en este caso, y row-cols-md-2 es para los otros casos cuando la pantalla sea normal o grande */}
                    {/* hacemos una lista dinamica */}
                    {lista.map((lista, index) => (
                        // "index" en este caso es llamado de manera que pueda usarse como key, de manera que cada elemento del li sea unico
                        <div className="col d-flex px-0 white-letter" value={lista.musculo} key={`${index} ${lista.muscle}`}>
                            {/* colocamos el "value" que va hacer el state o muscle seleccionado */}
                            {/* se usa col para que cada img sea una column, d-flex es para que la imagen ocupe todo el espacio, px-0 es para quitar el espacio entre imags */}
                            <div className="d-flex  position-relative " id="muscleList">
                                {/* se usa d-flex para las imagenes se mantengan grandes y amplias, position-relative es para los textos esten encima de cada imagen correspondiente */}
                                {/* en este div que es donde estan las lista se debe colocar este "id" que es para indicar al scroll donde va ir */}
                                <img className="img-fluid" alt="" src={lista.picture} />
                                {/* img-fluid es un class para imags para que ocupen su maximo tamaño */}
                                <p className="display-4 Title-menu position-absolute mx-5" onClick={() => buttonMuscle(lista.musculo)} >
                                    {/* se usa position-absolute para que el nombre del musculo no se salga de la imagen al reducir la pantalla, title-menu es un class creado para dar estilo extra a las letras */}
                                    {lista.musculo}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return !profile || !profile._id ? <Spinner /> : muscleList();
    // colocamos este condicional para que cuando no este cargado profile, muestre el spinner mientras 
    // solo llamamos la funcion "muscleList" ya que todo esta dentro de ella.. no se puede colocar la funcion dentro de return de esa forma, habria que hacerlo de otra manera

};

const mapStateToProps = state => ({
    profile: state.profile.ProfileUser
    // llamamos profile en este component para solo usarlo en el condicional ya que el se ejecuta por el getProfile y si el object esta vacio puede dar problemas
});


export default connect(mapStateToProps, { getProfile })(RoutinesType);

