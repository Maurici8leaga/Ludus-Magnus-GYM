import React from 'react';

const VideoDetail = ({video}) =>{
    if(!video){
        return(
            <div className="ui active centered inline loader">Loading</div>
        );
    }

    const videoSrc = `https://www.youtube.com/embed/${video.youtubeID}`
                                                    // "youtubeId" va a ser el id de mis videos especificados

    return(
        <div>
            <div className="ui embed">
                <iframe title="video player" src={videoSrc}/>
            </div>
            <div className="ui segment">
                <h4 className="ui header">{video.title}</h4>
                <p>{video.description}</p>
            </div>
        </div>
    );
}


export default VideoDetail;