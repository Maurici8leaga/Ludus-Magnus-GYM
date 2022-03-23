// ESTE ES UN GENERIC MODAL CON PORTAL DE MANERA QUE PUEDA SER REUTILIZADO EN VARIOS COMPONENT Y HACERLO MAS DRY
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hideModal } from '../../../../actions/modal';


const structureModal = (children, title, hideModal) => (
    <div className="modal" tabIndex="-1" onClick={e => hideModal()}>
    {/* colocamos este onClick para cuando el usuario de click afuera del modal este se cierre */}
            {/* el class "modal" es de bootstrap y lo usamos para hacer este modal responsive */}
                    {/* recuerda que como dentro de este onClick va ser llamado un actions debe colocarse "e =>" para que no de error y sea una function a llamar si se da click */}
        <div className="modal-dialog modal-fullscreen-sm-down">
            {/* el class "modal-dialog" es importante porque con el el modal puede ajustarse segun el tamaño de la pantalla */}
                    {/* estos modal class vienen de bootstrap, pero el modal-fullscreen-sm-down permite colocar el modal pantalla completa cuando llegue a un breakpoint este caso el small */}
            <div className="modal-content" onClick={e => e.stopPropagation()}>
            {/* aca el "e.stopPropagation" lo que hace es que detenga la accion anterior (onClick de CloseUp) si es que es ejecutado, entonces cuando el user haga click dentro del modal no cierre por el "onClick de CloseUp" */}
                <div className="modal-header">
                    {/* modal-header es importante si se quiere que el title y el boton esten uno del lado del otro y no encima amontonados */}
                    <h2 className="modal-title">{title}</h2>
                            {/* title va ser el titulo que se coloque como prop en el component donde se llamado este modal */}
                    <button type="button" className="btn-close"  onClick={e => hideModal()}></button>
                                {/* este class "btn-close" es de bootstrap y es una X grande */}
                </div>

                <div className="modal-body">
                    {/* el class modal-body de bootstrap va a cubrir todo el contenido del modal es importante colocarlo */}
                    {children}
                    {/* children va a ser el contenido que envuelva este generic modal, ya sea forms, imagenes, text etc */}
                </div>
            </div>
        </div>
    </div>
);

const portalModal = ({ statusModal, children, title, hideModal }) => {
                // se pasa como prop estos ya que se neecesitan para mostrar el contenido de los que vayan hacer el titulo y el contenido del modal y cerrar el modal
    return statusModal ? ReactDOM.createPortal(structureModal(children, title, hideModal), document.getElementById("modal")) : null;
    // ReactDOM.createPortal es elemental para "PORTALS" seguido de document.getElementById("modal") ya que este son los parametros para que funcione, "modal" es el id que se le dio en el div del html en el body del project
            // statusModal como es un bool este si es true va a mostrar el modal si no va a mostrar null, se necesita esto para poder controlar el comportamiento del modal
                        // hideModal debe ir ya que sin el da un error si se le llega dar click a la X o afuera del modal
}

portalModal.propTypes = {
    statusModal: PropTypes.bool,
    hideModal: PropTypes.func
}

const mapStateToProps = state => ({
    statusModal : state.modal.modalState
        // este statusModal es el state del modal debe ir en el component ya que en este component vamos a cambiar el valor de ese state
});

export default connect(mapStateToProps, {hideModal}) (portalModal);
