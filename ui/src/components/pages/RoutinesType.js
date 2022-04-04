import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-scroll';
import Alert from '../extras/Alert';
import Abs from '../img/abs.png';
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

    useEffect(() => {
        getProfile();
    }, [getProfile]);

    const [, setMuscle] = useState('');

    const list = [
        { muscle: 'BICEP', picture: Bicep },
        { muscle: 'ABS', picture: Abs },
        { muscle: 'BACK', picture: Espalda },
        { muscle: 'SHOULDER', picture: Hombro },
        { muscle: 'CHEST', picture: Pecho },
        { muscle: 'LEG', picture: Pierna },
        { muscle: 'TRICEP', picture: Tricep },
        { muscle: 'YOGA', picture: Yoga }
    ];

    const buttonMuscle = (muscle) => {
        setMuscle({ ...muscle });
        history.push(`/exercises/${muscle}`);
    }

    const muscleList = () => (
        <div className="container-muscle">
            <div className="screen-muscleTipe"> 
                <div className="screen-muscleTipe-darkBlur">

                    <Alert />

                    <div className="text-center extra-mt-responsive white-letter">
                        <h1 className="display-2 highlight-title ">Muscle Type </h1>
                        <p className="h3 highlight-title2 mt-5">Choose the muscle you want to workout</p>
                    </div>

                    <div className="arrow text-center mt-5">
                        <Link className="links-scss"
                            activeClass="active"
                            to="muscleList"
                            // this "to" is once we clicked on the arrow, it will take us to where the id is
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={250}
                        >
                            <i className="fas fa-angle-down" />
                        </Link>
                    </div>
                </div>
            </div>

            <div>
                <div className="row row-cols-1 row-cols-md-2">

                    {list.map((list, index) => (
                        <div className="col d-flex px-0 white-letter" value={list.muscle} key={`${index} ${list.muscle}`}>
                            <div className="d-flex  position-relative " id="muscleList">
                                <img className="img-fluid" alt="" src={list.picture} />
                                <p className="display-4 Title-menu position-absolute mx-5" onClick={() => buttonMuscle(list.muscle)} >
                                    {list.muscle}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return !profile || !profile._id ? <Spinner /> : muscleList();
};

const mapStateToProps = state => ({
    profile: state.profile.ProfileUser
});

export default connect(mapStateToProps, { getProfile })(RoutinesType);

