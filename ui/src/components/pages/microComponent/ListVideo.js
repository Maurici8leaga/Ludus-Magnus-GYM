import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const ListVideo = ({ history, video: { modo, profesor, duracion, imagen, idioma, _id } }) => {
    // "video" viene como props del otro component VideoList.. gracias a el podemos tener acceso a las propiedades y lo mismo con "history"

    const [, setVideo] = useState('');
    // se deja en blaco el primer state ya que no es usado

    const buttonMuscle = (video) => {
        setVideo({ ...video });
        history.push(`/video/execise/${video}`);
    }

    return (
        <div className="container">
                {/* colocamos dentro del "button" el "_id" que al pasarlo con la funcion toma el ID del video clickeado */}
            <div className="img-fluid position-relative" onClick={() => buttonMuscle(_id)}>
                {/* img-fluid es un class para hacer responsive las imagenes de los videos */}
                        {/* el  position-relative para que cuando el user este encima de la img se opaque y muestre la info del video*/}

                <>
                    <img className="img-exercise" alt="portada" src={imagen} />
                </>

                <div className="info-muscle">
                    <ul className="h6 info-align text-center"> 
                        <li>Professor: {profesor}</li>
                        <li>Language: {idioma}</li>
                        <li>Lenght: {duracion} min</li>
                        <li>Type of exercise: {modo}</li>
                    </ul>
                </div>
            </div>
        </div>
    );

};


ListVideo.propTypes = {
    muscleList: PropTypes.object
}

export default connect(null)(ListVideo);