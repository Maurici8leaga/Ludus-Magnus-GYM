import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getProfile} from '../../actions/profile';

const Profile = ({getProfile, profile}) => {


    useEffect(() => {
        getProfile();
    }, []);

    console.log('Profile --->', profile);

    return(
            <div className="ui centered grid">
                <div className="ui items">
                <div className="item">

                    <div className="image">
                        <img src="http://alerta.mapbiomas.org/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png"/>>
                    </div>

                    <div className="content">
                        <a className = "header">Profile </a>

                        <div className="meta">
                            <span>Description</span>
                        </div>

                        <div className="description">
                            <li>
                                <ul>Apellido</ul>
                                <ul>Edad años</ul>
                                <ul>Altura m</ul>
                                <ul>Peso kg </ul>
                                <ul>Sexo </ul>
                            </li>
                        </div>

                        <div className="extra">
                            Additional Details
                        </div>
                    </div>

                </div>
            </div>
            </div>
    );
};

Profile.propTypes = {
    getProfile:PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect (mapStateToProps, {getProfile})(Profile);