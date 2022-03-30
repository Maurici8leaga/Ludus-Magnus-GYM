import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const ListVideo = ({ history, video: { mode, trainer, length, image, language, _id } }) => {
    
    const [, setVideo] = useState('');

    const buttonMuscle = (video) => {
        setVideo({ ...video });
        history.push(`/video/execise/${video}`);
    }

    return (
        <div className="container">
            <div className="img-fluid position-relative" onClick={() => buttonMuscle(_id)}>

                <>
                    <img className="img-exercise" alt="portada" src={image} />
                </>

                <div className="info-muscle">
                    <ul className="h6 info-align text-center"> 
                        <li>Trainer: {trainer}</li>
                        <li>Language: {language}</li>
                        <li>Lenght: {length} min</li>
                        <li>Type of exercise: {mode}</li>
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