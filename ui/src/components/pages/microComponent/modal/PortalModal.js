// This is a generic modal component
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hideModal } from '../../../../actions/modal';


const structureModal = (children, title, hideModal) => (

    <div className="modal" tabIndex="-1" onClick={e => hideModal()}>
        <div className="modal-dialog modal-fullscreen-sm-down">
            <div className="modal-content" onClick={e => e.stopPropagation()}>

                <div className="modal-header">
                    <h2 className="modal-title">{title}</h2>
                    <button type="button" className="btn-close"  onClick={e => hideModal()}></button>
                </div>

                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    </div>
);

const portalModal = ({ statusModal, children, title, hideModal }) => {
    return statusModal ? ReactDOM.createPortal(structureModal(children, title, hideModal), document.getElementById("modal")) : null;
}

portalModal.propTypes = {
    statusModal: PropTypes.bool,
    hideModal: PropTypes.func
}

const mapStateToProps = state => ({
    statusModal : state.modal.modalState
});

export default connect(mapStateToProps, {hideModal}) (portalModal);
