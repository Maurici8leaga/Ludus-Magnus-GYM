import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getProfile} from '../../actions/profile';

const Profile = ({getProfile, profile, auth : {user}}) => {


    useEffect(() => {
        getProfile();
        console.log('Profile --->', profile);
        console.log('user -->', user);
    }, []);


    return(
            <div className="ui centered grid">
                <div className="ui items">
                    <div className="item">

                        <div className="image">
                            <img src="http://alerta.mapbiomas.org/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png"/>>
                        </div>

                        <table className="ui single line table">
                            <thead>
                                <tr>
                                <th>Name</th>
                                <th>Apellido</th>
                                <th>Edad</th>
                                <th>Altura</th>
                                <th>Peso</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr key={profile._id}>
                                    <td>{profile.name}</td>
                                    <td>{profile.lastname}</td>
                                    <td>{profile.age}</td>
                                    <td>{profile.height}</td>
                                    <td>{profile.weight}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    );
};

Profile.propTypes = {
    getProfile:PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect (mapStateToProps, {getProfile})(Profile);