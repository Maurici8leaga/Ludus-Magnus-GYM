import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../../videoTools/VideoItem.css';

const ListVideo = ({ history, video:{category, modo, profesor, duracion, imagen, idioma, _id} }) => {
                    // "video" viene como props del otro component VideoList.. gracias a el podemos tener acceso a las propiedades y lo mismo con "history"

    const [, setVideo] = useState('');
    // se deja en blaco el primer state ya que no es usado

    const buttonMuscle = (video) => {
        setVideo({ ...video });
        history.push(`/video/execise/${video}`);
    }
    
    return (
        <div className="video-item item">
            <div className="content" onClick={() => buttonMuscle(_id)}>
                                                {/* colocamos dentro del "button" el "_id" que al pasarlo con la funcion toma el ID del video clickeado */}
                <div className="header">
                    {modo} - {category}
                </div>
                <div className="image">
                    <img alt="portada" src={imagen} />
                </div>
                <div className="">
                    <ul>
                        <li>Profesor: {profesor}</li>
                        <li>Idioma: {idioma}</li>
                        <li>Duracion: {duracion}</li>
                    </ul>
                </div>
                <hr/>
            </div>
        </div>
    );

};


ListVideo.propTypes = {
    muscleList: PropTypes.object
}

// const mapStateToProps = state => {
//     muscleList: state.video.MuscleList
// }

export default connect(null)(ListVideo);