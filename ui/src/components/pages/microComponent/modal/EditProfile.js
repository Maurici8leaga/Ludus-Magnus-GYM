import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateProfile } from '../../../../actions/profile';
import { hideModal } from '../../../../actions/modal';


const EditProfile = ({ updateProfile, profile, hideModal }) => {
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
        hideModal();
        // hideModal es el actions para cerrar el modal, de esta manera apenas se haga submit se va a cerrar el modal
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="container-fluid extra-ptYpb-of0-to3">
                {/* cointer-fluid es un class de bootstrap que ayuda a este form ser responsive, el class extra es para cuando cambie de breakpoint agregue un padding */}
                <div className="row text-center">
                    <div className="col-12 my-3">
                        <input className="inputModal" type="text" name="name" placeholder="Nombre" value={infoEdit.name} title="Nombre" onChange={e => onChange(e)} />
                        <label className="labelModal">Name</label>
                    </div>
                    <div className="col-12 my-3">
                        <input className="inputModal" type="text" name="lastname" placeholder="Apellido" value={infoEdit.lastname} onChange={e => onChange(e)}/>
                        <label className="labelModal">Lastname</label>
                    </div>
                    <div className="col-sm-6 d-flex my-3">
                        {/* se coloca d-flex para que con el otro input puedan estar en la misma linea del form */}
                        <input className="inputModal-small flex-fill" type="number" name="weight" placeholder="Kg" value={infoEdit.weight} onChange={e => onChange(e)} />
                        <label className="labelModal">kilograms</label>
                    </div>
                    <div className="col-sm-6 d-flex my-3">
                        {/* col-sm-6 es para que sea 6 hasta ese breakpoint y luego se conviertan en 12 y este cada uno en una linea propia */}
                        <input className="inputModal-small flex-fill" type="number" name="height" placeholder="Metros" value={infoEdit.height} onChange={e => onChange(e)} />
                        <label className="labelModal">Meters</label>
                    </div>
                </div>
            </div>
            <div className="modal-footer ">
                {/* IMPORTANTE PARA LOS BOTONES DENTRO DE UN FORM */}
                <button className="botonModal" type="submit">Save</button>
                {/* debe haber un boton designado AJURO como "type=submit" y ese mismo no puede llevar NINNGUN onClick o alguna otra FUNCION porque va a dar un ERROR MALDITO */}
                {/* ademas ese debe ir encima de cualquier otro */}
                <button className="botonModal" type="button" onClick={e => hideModal()}>Cancel</button>
                {/* el segundo boton preferible solo 2, debe ir despues Y DEBE TENER AJURO "type=button" PARA QUE NO DE ERROR MALDITO */}
            </div>
        </form>

    );
}

EditProfile.propTypes = {
    updateProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    // se coloca "profile" porque es el objeto como prop que nos esta trayendo la data y es Isrequired porque es IMPORTANTE
    hideModal: PropTypes.func
};

const mapStateToProps = state => ({
    statusModal : state.modal.modalState
    // este statusModal es el state del modal debe ir en el component ya que en este component vamos a cambiar el valor de ese state
});

export default connect(mapStateToProps, { updateProfile, hideModal })(EditProfile);