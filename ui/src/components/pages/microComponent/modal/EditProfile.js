import React, { useState } from 'react';
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

        <div className="modal" onClick={() => closeUp(false)}>
            {/* colocamos este onClick para cuando el usuario de click afuera del modal este se cierre */}
            <div className="container-signin">
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    {/* aca el "e.stopPropagation" lo que hace es que detenga la accion anterior (onClick de CloseUp) si es que es ejecutado, entonces cuando el user haga click dentro del modal no cierre por el "onClick de CloseUp" */}
                    <div className="modal-header">
                        <h2>Edita tu informacion</h2>
                    </div>
                    <div className="modal-body">
                        <form className="form" onSubmit={onSubmit}>
                            <div>

                                <div className="form-input-individual-small">
                                    <input className="inputModal" type="text" name="name" placeholder="Nombre" value={infoEdit.name} title="Nombre" onChange={e => onChange(e)} />
                                    <label className="labelModal">Nombre</label>
                                </div>

                                <div className="form-input-individual-small">
                                    <input className="inputModal" type="text" name="lastname" placeholder="Apellido" value={infoEdit.lastname} onChange={e => onChange(e)} />
                                    <label className="labelModal">Apellido</label>
                                </div>

                                <div className="form-group-2">
                                    <div className="form-input-doble-small">
                                        <input className="inputModal" type="number" name="weight" placeholder="Kg" value={infoEdit.weight} onChange={e => onChange(e)} />
                                        <label className="labelModal">Kg</label>
                                    </div>

                                    <div className="form-input-doble-small">
                                        <input className="inputModal" type="number" name="height" placeholder="Metros" value={infoEdit.height} onChange={e => onChange(e)} />
                                        <label className="labelModal">Metros</label>
                                    </div>
                                </div>



                                <div className="modal-container-button">
                                    {/* IMPORTANTE PARA LOS BOTONES DENTRO DE UN FORM */}
                                    <button className="botonModal" type="submit"  > Save </button>
                                    {/* debe haber un boton designado AJURO como "type=submit" y ese mismo no puede llevar NINNGUN onClick o alguna otra FUNCION porque va a dar un ERROR MALDITO */}
                                    {/* ademas ese debe ir encima de cualquier otro */}
                                    <button className="botonModal" type="button" onClick={() => closeUp(false)}>Cancel</button>
                                    {/* el segundo boton preferible solo 2, debe ir despues Y DEBE TENER AJURO "type=button" PARA QUE NO DE ERROR MALDITO */}
                                </div>

                            </div>
                        </form>
                    </div>
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
