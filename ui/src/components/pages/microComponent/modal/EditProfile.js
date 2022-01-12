import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateProfile } from '../../../../actions/profile';


const EditProfile = ({ updateProfile, profile, closeUp }) => {
    // los action y los props deben ir aca!!

    const { name, lastname, weight, height } = profile;


    const [infoEdit, setinfoEdit] = useState({
        // creamos un state demanera de asi poder cambiar los valores de los inputs
        name,
        lastname,
        height,
        weight
    });



    const onChange = e => setinfoEdit({ ...infoEdit, [e.target.name]: e.target.value });

    const onSubmit = event => {
        event.preventDefault();
        updateProfile(infoEdit);
        // se coloca "infoEdit" dentro del actions para que se pueda asi enviar al actions y al backend de resto no se mandaria nada
        closeUp(false);
        // para cerrar el modal una vez haciendo submit
    }


    return (

        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Edita tu informacion</h4>
                </div>
                <div className="modal-body">
                    <form className="form" onSubmit={onSubmit}>
                        <div>

                            <div className="form-input-individual">
                                <label>Nombre</label>
                                <input className="form-input-individual" type="text" name="name" placeholder="Nombre" value={infoEdit.name} title="Nombre" onChange={e => onChange(e)} />
                            </div>

                            <div className="form-input-individual">
                                <label>Apellido</label>
                                <input className="form-input-individual" type="text" name="lastname" placeholder="Apellido" value={infoEdit.lastname} onChange={e => onChange(e)} />
                            </div>

                            <div className="form-input-individual">
                                <label>Peso</label>
                                <input className="form-input-individual" type="number" name="weight" placeholder="Kg" value={infoEdit.weight} onChange={e => onChange(e)} />
                            </div>

                            <div className="form-input-individual">
                                <label>Altura</label>
                                <input className="form-input-individual" type="number" name="height" placeholder="Metros" value={infoEdit.height} onChange={e => onChange(e)} />
                            </div>


                            <div className="modal-footer">
                                {/* IMPORTANTE PARA LOS BOTONES DENTRO DE UN FORM */}
                                <button className="button" type="submit"  > Save </button>
                                    {/* debe haber un boton designado AJURO como "type=submit" y ese mismo no puede llevar NINNGUN onClick o alguna otra FUNCION porque va a dar un ERROR MALDITO */}
                                    {/* ademas ese debe ir encima de cualquier otro */}
                                <button className="button" type="button" onClick={() => closeUp(false)}>Cancel</button>
                                    {/* el segundo boton preferible solo 2, debe ir despues Y DEBE TENER AJURO "type=button" PARA QUE NO DE ERROR MALDITO */}
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>

    )

}

EditProfile.propTypes = {
    updateProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
    // se coloca "profile" porque es el objeto como prop que nos esta trayendo la data y es Isrequired porque es IMPORTANTE
};

export default connect(null, { updateProfile })(EditProfile);
// se coloca "null" porque no hace falta mapStateToProps aca
