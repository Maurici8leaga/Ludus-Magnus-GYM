import ReactDOM from "react-dom";
import './modalGeneric.scss';
// CABE DESTACAR QUE LOS CLASS DE ACA SON UNA REFERENCIA NO AJURO TIENEN QUE SER ASI

const Modal = ({ show, close, title, children }) => {
    // PROPS Y PARA QUE SON:
        // show es el state que se manda del parent component, para abrir y cerrar el modal
        // close es la funcion que va hacer que se cierre el modal
        // title va a ser el titlo que va a llevar el modal
        // children es el contenido que va a tener dentro el modal, este puede ser texto, imagenes, form etc


    return ReactDOM.createPortal(
        // ReactDOM.createPortal <- de esta forma aplicamos POrtals en el modal el primer elemento va a ser el modal en este caso el ultimo debe ser el nombre del id que hallamos colocado en el index Html
        <>
            {
                show ?
                // este condicional es para que si el estado del state es false no se abra el modal, solo cuando es necesario

                    <div className="modalContainer" onClick={() => close()}>
                        <div className="modal" onClick={(e) => e.stopPropagation()}>
                            <div className="modal_header">
                                <h2 className="modal_header-title"> {title} </h2>
                                            {/* aca se coloca el title de esta forma para que valla lo que hallamos puesto en el parent component */}
                                <button className="close" onClick={() => close()}>
                                    X
                                    {/* aqui puede ser un texto o una imagen como se desee */}
                                </button>
                            </div>
                            <div className="modal_content"> {children} </div>
                            {/* aqui en children ira todo el contenido que se coloque en el parent component, ya sea texto, imagen, forms etc */}
                            <div className="modal_footer">
                                <button className="modal-close" onClick={() => close()}>
                                    Cancel
                                </button>

                                <button className="submit">Submit</button>
                            </div>
                        </div>
                    </div>
                    : null
            }
        </>
        , document.getElementById("modal")
        // con este document.getElementById y el nombre que le coloquemos al id en index html en este caso "modal" el portal va a saber donde colocar el modal
    );
};

export default Modal;