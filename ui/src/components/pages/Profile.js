import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfile } from '../../actions/profile';
import { uploadAvatar } from '../../actions/avatar';
import { showModal } from '../../actions/modal';
import moment from 'moment';
import Alert from '../extras/Alert';
import EditProfile from './microComponent/modal/EditProfile';
import Spinner from '../extras/Spinner';
import PortalModal from '../pages/microComponent/modal/PortalModal';

const Profile = ({ getProfile, uploadAvatar, profile, showModal }) => {

    const { name, lastname, birth, height, weight } = profile;

    useEffect(() => {
        getProfile();
    }, [getProfile]);

    const formData = new FormData();

    const onChange = (e) => {
        if (e.target && e.target.files[0]) {
            formData.append('picture-profile', e.target.files[0]);
            buttonSubmit(formData);
        }
    }

    const buttonSubmit = () => {
        uploadAvatar(formData);
    }

    const avatarImage = () => {

        const { avatar } = profile;

        // Avatar default
        let avatarUrl = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

        // Avatar picture custom
        if (typeof avatar === 'object') {
            avatarUrl = `http://localhost:3001/api/avatar${avatar.url}`
            return (
                <img className="img-thumbnail avatar-mini" alt="avatar" src={avatarUrl} />
            );
        }
        return (
            <img className="img-thumbnail avatar-mini" alt="avatar" src={avatarUrl} />
        );

    }

    // calculate the current age of the user
    const dateToDay = moment();
    const userBirth = moment(birth);
    const yearsToDay = dateToDay.diff(userBirth, 'years');

    return !profile || !profile._id ? <Spinner /> : (

        <div className="screen-Profile">
            <div className="screen-Profile-blur overflow-scroll">
                <div className="container">

                    <Alert />

                    <div className="text-center extra-pt-x10">
                        <h1 className="highlight-title white-letter">Profile</h1>
                        <h3 className="highlight-title2 ">This is your current information</h3>
                    </div>

                    <div className="card mb-3 extra-max-w mx-auto screen-card-profile">
                        <div className="row g-0 text-center ">

                            <div className="col-md-4 extra-ptYpb-of0-to1">
                                <div className="avatar-container-profile">
                                    <div className="avatar-mini">
                                        {avatarImage()}
                                    </div>
                                </div>

                                <>
                                    <label className="button-border-line-positive-small">
                                        <input type="file" name='fileButton' onChange={onChange} required></input>
                                        <i className="fas fa-camera"></i>
                                    </label>

                                    <>
                                        <button className="button-border-line-positive" onClick={e => showModal()}> Edit profile</button>
                                            <PortalModal title={"Edit your personal information"}>
                                                <EditProfile  profile={profile}/>
                                            </PortalModal>
                                    </>
                                </>
                            </div>

                            <div className="col-md-4 mt-4">
                                <div className="card-body">
                                    <h5 className="card-title extra-ptYpb-of3-to1  positive-letter">{name}  {lastname} </h5>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <ul className="list-group list-group-flush">

                                    <li className="list-group-item box-data-info positive-letter">
                                        <span className="card-text">{yearsToDay} Years old</span>
                                        <span className="card-text"> <i className="fas fa-clock">Age</i> </span>
                                    </li>

                                    <li className="list-group-item box-data-info positive-letter">
                                        <span className="card-text">{height} m</span>
                                        <span className="card-text"> <i className="fas fa-ruler-vertical"> Height</i> </span>
                                    </li>

                                    <li className="list-group-item box-data-info positive-letter">
                                        <span className="card-text">{weight} Kg</span>
                                        <span className="card-text"> <i className="fas fa-balance-scale"> Weight </i> </span>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

Profile.propTypes = {
    getProfile: PropTypes.func.isRequired,
    uploadAvatar: PropTypes.func,
    showModal: PropTypes.func,
    ProfileUser: PropTypes.object
}

const mapStateToProps = state => ({
    profile: state.profile.ProfileUser
});

export default connect(mapStateToProps, { getProfile, uploadAvatar, showModal })(Profile);