import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProfile } from '../../actions/profile';


const EditProfile = ({ getProfile, profile }) => {

    useEffect(() => {
        getProfile();
    }, [getProfile]);

    const { name, lastname, height, weight } = profile;
    console.log('ESTO SON LOS PROPS EN EDIT PROFILE', profile);


    return (
        <div className="container-Profile-background">
            <div className="container-signin">
                <form className="form">
                    <Link to="/profile" className="links-scss">
                        <i className="far fa-window-close"></i>
                    </Link>
                    <div>

                        <ul>
                            {/* <li> {age} Años</li> */}
                            <li> 
                                <input className="form-input-individual" type="text" name="name" placeholder="Nombre" value={name} title ="Nombre"/>
                            </li>
                            <li> 
                                <input className="form-input-individual" type="text" name="lastname" placeholder="Apellido" value={lastname} />
                            </li>
                            <li> 
                                <input className="form-input-individual" type="number" name="weight" placeholder="Kg" value={weight} />
                            </li>
                            <li> 
                                <input className="form-input-individual" type="number" name="height" placeholder="Metros" value={height} />
                            </li>

                        </ul>

                        <button className="boton -primary-long" type="submit" value="Save"> Save </button>
                    </div>
                </form>
            </div>
        </div>


    )

}

EditProfile.propTypes = {
    getProfile: PropTypes.func.isRequired,
    ProfileUser: PropTypes.object
};


const mapStateToProps = state => ({
    profile: state.profile.ProfileUser
});

export default connect(mapStateToProps, { getProfile })(EditProfile);
