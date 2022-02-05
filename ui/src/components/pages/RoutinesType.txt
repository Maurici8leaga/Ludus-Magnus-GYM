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
import {loadToTop} from '../extras/helpers';
import {getProfile} from '../../actions/profile';
import Spinner from '../extras/Spinner';

const RoutinesType = ({ history, getProfile, profile }) => {
    // se debe colocar "history" aqui como props para poder tener acceso a el y hacer el redireccionamiento 

    useEffect(() => {
        loadToTop();
        getProfile();
    }, [getProfile]);

    const [, setMuscle] = useState('');

    const lista = [
        { musculo: 'BICEP', picture: Bicep },
        { musculo: 'ABDOMINAL', picture: Abs },
        { musculo: 'ESPALDA', picture: Espalda },
        { musculo: 'HOMBRO', picture: Hombro },
        { musculo: 'PECHO', picture: Pecho },
        { musculo: 'PIERNA', picture: Pierna },
        { musculo: 'TRICEP', picture: Tricep },
        { musculo: 'YOGA', picture: Yoga}
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
            <div className="Image-container-muscleTipe">

                <Alert />

                <div className="Title-container">
                    <h1 className="highlight-title texto-secundary">Tipo de musculo </h1>

                    <p className="highlight-title2">Escoje el musculo que quieres ejercitar</p>
                </div>

                <div className="arrow">
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
                        duration={500}
                    // el tiempo de duracion del efecto scrolling
                    >
                        <i className="fas fa-angle-down" />
                    </Link>
                </div>
            </div>

            <div>
                <div className="menu-grid">
                    {/* hacemos una lista dinamica */}
                    {lista.map((lista, index) => (
                        // "index" en este caso es llamado de manera que pueda usarse como key, de manera que cada elemento del li sea unico
                        <div className="lista-menu-muscle" value={lista.musculo} key={`${index} ${lista.muscle}`}>
                            {/* colocamos el "value" que va hacer el state o muscle seleccionado */}
                            <div className="menu-muscle">
                                <div className="menu-muscle-details" id="muscleList">
                                    {/* en este div que es donde estan las lista se debe colocar este "id" que es para indicar al scroll donde va ir */}
                                    <img  alt="" src={lista.picture} />
                                    <p className="Title-menu" onClick={() => buttonMuscle(lista.musculo)} >
                                        {lista.musculo}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return !profile || !profile._id ? <Spinner/> : muscleList();
        // colocamos este condicional para que cuando no este cargado profile, muestre el spinner mientras 
    // solo llamamos la funcion "muscleList" ya que todo esta dentro de ella.. no se puede colocar la funcion dentro de return de esa forma, habria que hacerlo de otra manera

};

const mapStateToProps = state => ({
    profile: state.profile.ProfileUser
    // llamamos profile en este component para solo usarlo en el condicional ya que el se ejecuta por el getProfile y si el object esta vacio puede dar problemas
});


export default connect(mapStateToProps, {getProfile})(RoutinesType);

