import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getVideoById } from '../../actions/videos';
import './scss/RoutinesType.scss';

const Video = ({ getVideoById, match, muscleId}) => {

    useEffect(() => {
        getVideoById(match.params.id);
        console.log(muscleId, '<- este es muscleId')
    }, [getVideoById]);


    const {title, description, youtubeID, category, modo} = muscleId;

    const search = `https://www.youtube.com/embed/${youtubeID}`;
    // esta variable hara el request al link de youtube y podras acceder al video OJO se debe colocar "/embed" AJURO si no no agarra el video

    return (
        <div className="ui container">

            <h1 className="intro">Rutina de {category} con {modo} </h1>

            <div className="ui grid">
                <div className="ui row">
                    <div className="eleven wide column">
                        <div className="ui embed">
                            <iframe title="video player" src={search} />
                                                    {/* src permitira hacer el request al youtube para reproducir el video */}
                        </div>
                        <div className="ui segment">
                            <h4 className="ui header">{title}</h4>
                            <p>{description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Video.prototype = {
    getVideoById: PropTypes.func.isRequired,
    videoId: PropTypes.object
}

const mapStateToProps = state => ({
    muscleId: state.video.videoId
});

export default connect(mapStateToProps, {getVideoById})(Video);
