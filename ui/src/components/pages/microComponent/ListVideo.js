import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../../videoTools/VideoItem.css';

const ListVideo = ({ history, video:{ modo, profesor, duracion, imagen, idioma, _id} }) => {
                    // "video" viene como props del otro component VideoList.. gracias a el podemos tener acceso a las propiedades y lo mismo con "history"

    const [, setVideo] = useState('');
    // se deja en blaco el primer state ya que no es usado

    const buttonMuscle = (video) => {
        setVideo({ ...video });
        history.push(`/video/execise/${video}`);
    }
    
    return (
        <div>
            <div className="wrap-img" onClick={() => buttonMuscle(_id)}>
                                                {/* colocamos dentro del "button" el "_id" que al pasarlo con la funcion toma el ID del video clickeado */}
                
                <>
                    <img  className="img-exercise" alt="portada" src={imagen} />
                </>

                <div className="info-muscle">
                    <ul className="info-align">
                        <li >Profesor: {profesor}</li>
                        <li>Idioma: {idioma}</li>
                        <li>Duracion: {duracion} min</li>
                        <li>Tipo de ejercicio: {modo}</li>
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