import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateProfile } from '../../../../actions/profile';
import { hideModal } from '../../../../actions/modal';


const EditProfile = ({ updateProfile, profile, hideModal }) => {

    const { name, lastname, weight, height } = profile;

    const [infoEdit, setinfoEdit] = useState({
        name,
        lastname,
        height,
        weight
    });

    const onChange = e => setinfoEdit({ ...infoEdit, [e.target.name]: e.target.value });

    const onSubmit = event => {
        event.preventDefault();
        updateProfile(infoEdit);
        hideModal();
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="container-fluid extra-ptYpb-of0-to3">
                <div className="row text-center">

                    <div className="col-12 my-3">
                        <input className="inputModal" type="text" name="name" placeholder="Name" value={infoEdit.name} title="Name" onChange={e => onChange(e)} />
                        <label className="labelModal">Name</label>
                    </div>

                    <div className="col-12 my-3">
                        <input className="inputModal" type="text" name="lastname" placeholder="Lastname" value={infoEdit.lastname} onChange={e => onChange(e)}/>
                        <label className="labelModal">Lastname</label>
                    </div>

                    <div className="col-sm-6 d-flex my-3">
                        <input className="inputModal-small flex-fill" type="number" name="weight" placeholder="Kg" value={infoEdit.weight} onChange={e => onChange(e)} />
                        <label className="labelModal">kilograms</label>
                    </div>

                    <div className="col-sm-6 d-flex my-3">
                        <input className="inputModal-small flex-fill" type="number" name="height" placeholder="Meters" value={infoEdit.height} onChange={e => onChange(e)} />
                        <label className="labelModal">Meters</label>
                    </div>
                </div>
            </div>
            <div className="modal-footer ">
                <button className="buttonModal" type="submit">Save</button>
                <button className="buttonModal" type="button" onClick={e => hideModal()}>Cancel</button>
            </div>
        </form>

    );
}

EditProfile.propTypes = {
    updateProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    hideModal: PropTypes.func
};

const mapStateToProps = state => ({
    statusModal : state.modal.modalState
});

export default connect(mapStateToProps, { updateProfile, hideModal })(EditProfile);