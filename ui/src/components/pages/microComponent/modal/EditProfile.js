import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { getProfile, updateProfile } from '../../../../actions/profile';


const EditProfile = ({ getProfile, updateProfile, profile, Open, onClose }) => {
    // los action y los props deben ir aca!!

    const {name, lastname, weight, height} = profile;

    if (!Open) {
        return null
    };


    // const [infoEdit, SetinfoEdit] = useState({
    //     // creamos un state demanera de asi poder cambiar los valores de los inputs
    //     name: '',
    //     lastname: '',
    //     height: '',
    //     weight: ''
    // });

    // useEffect(() => {
    //     getProfile();

    //     SetinfoEdit({
    //         // aca vamos a indicar que si la propiedad tiene un valor muestrala, si no dejala en ''
    //         name: profile.name ? profile.name : '',
    //         lastname: profile.lastname ? profile.lastname : '',
    //         height: profile.height ? profile.height : '',
    //         weight: profile.weight ? profile.weight : ''        
    //     });

    //     console.log('ESTE ES profile EN EDIT PROFILE', profile)

    // }, [getProfile]);

    // const { name, lastname, height, weight } = infoEdit;
    // // declaramos estas propiedas se almacenaran dentro de infoEdit y este sera enviado al back

    // const onChange = e => SetinfoEdit({ ...infoEdit, [e.target.name]: e.target.value });

    // const onSubmit = e => {
    //     e.preventDefault();
    //     updateProfile(infoEdit);
    // }


    return (

        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Edita tu informacion</h4>
                </div>
                <div className="modal-body">
                <form className="form" >
                    {/* <Link to="/profile" className="links-scss">
                        <i className="far fa-window-close"></i>
                    </Link> */}
                    <div>

                        <ul>
                            <li>
                                <p>Nombre</p>
                                <input className="form-input-individual" type="text" name="name" placeholder="Nombre" value={name} title="Nombre" />
                            </li>
                            <li>
                                <p>Apellido</p>
                                <input className="form-input-individual" type="text" name="lastname" placeholder="Apellido" value={lastname} />
                            </li>
                            <li>
                                <p>Peso</p>
                                <input className="form-input-individual" type="number" name="weight" placeholder="Kg" value={weight} />
                            </li>
                            <li>
                                <p>Altura</p>
                                <input className="form-input-individual" type="number" name="height" placeholder="Metros" value={height} />
                            </li>

                        </ul>

                        {/* <button className="boton -primary-long" type="submit" value="Save"> Save </button> */}
                    </div>
                </form>

                </div>
                <div className="modal-footer">
                    <button className="button" onClick={() => onClose(false)}>Save</button>
                </div>
            </div>
        </div>

    )

}

EditProfile.propTypes = {
    getProfile: PropTypes.func.isRequired,
    updateProfile: PropTypes.func,
    profile: PropTypes.object.isRequired
    // ProfileUser: PropTypes.object
};


const mapStateToProps = state => ({
    // profile: state.profile.ProfileUser
});

export default connect(mapStateToProps, { getProfile, updateProfile })(EditProfile);
