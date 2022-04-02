import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ListVideo from '../pages/microComponent/ListVideo';
import { getListVideos, clearVideoList } from '../../actions/videos';
import { Link } from 'react-scroll';
import Alert from '../extras/Alert';
import Spinner from '../extras/Spinner';

const VideoListByMuscle = ({ getListVideos, match, muscleList, history, clearVideoList }) => {

    useEffect(() => {
        getListVideos(match.params.muscle);

        // this is like a "component WillUnmount"
        return () => clearVideoList();

    }, [getListVideos, match.params.muscle, clearVideoList]);

    return !muscleList || !muscleList.length > 0 ? <Spinner /> : (
        <div className="container-muscle">
            <div className="screen-videoList">
                <div className="screen-videoList-darkBlur">
                    <Alert />

                    <div className="text-center extra-mt-responsive white-letter">
                        <h1 className="display-2 highlight-title">Video List</h1>

                        <p className="h3 highlight-title2 mt-5">Choose the video you want to watch</p>
                    </div>

                    <div className="arrow text-center mt-5">
                        <Link className="links-scss"
                            activeClass="active"
                            to="exerciseList"
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                        >
                            <i className="fas fa-angle-down" />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="screen-videoList">
                <div className="wrap-page overflow-scroll">
                    <div className="container ">
                        <div className="row" id="exerciseList" >
                            {muscleList.map((muscle, index) => (
                                <div className="col-12 " key={index}>
                                    {muscle.video.length === 0 ? null : (
                                        <div>
                                            <div className="h1 text-positive my-3">
                                                {muscle.mode}
                                                <hr />
                                            </div>
                                            <div className="d-flex flex-row  row-cols-lg-3 row-cols-md-2 row-cols-sm-1 row-cols-1  overflow-scroll">
                                                {muscle.video.map((info, youtubeID) => (
                                                    <div className="d-flex mb-4" key={youtubeID}>
                                                        <ListVideo video={info} history={history} />
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
}

function mapStateToProps(state) {

    const { video: { videoList } } = state;
    const modes = new Set();

    // adding new values for each video
    videoList.forEach(v => modes.add(v.mode));
    const modesArray = ['Dumbbells', 'Machine', 'No Equipment', 'Beginners', 'Intermediate', 'Advanced'];
    const muscleList = modesArray.map(m => {

        // sorting the video inside the muscleList
        const subVideos = videoList.filter(v => v.mode === m);
        return { mode: m, video: subVideos };

        // filtering the videos with only the lenght '> 0'
    }).filter(({ video }) => video.length);

    return { muscleList };
};

export default connect(mapStateToProps, { getListVideos, clearVideoList })(VideoListByMuscle);

