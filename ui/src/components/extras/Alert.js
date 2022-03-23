import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../scss/index.scss';

const Alert = ({ alert }) =>
    alert !== null && alert.length > 0 && alert.map(message => (
        // EL NOMBRE DE ESTA FUNCION "message" es fundamental ya que asi se podra tener acceso al ID, MSG, ETC del message
        <div key={message.id} className="d-flex justify-content-center">
            {/* se coloca el "key" en este div para que no mande un warning diciendo que cada element li debe tener un key unico */}
            {/* usamos  d-flex para colocar justify-content-center y tener los alert siempre en el centro de la pagina*/}
            <div className={`alert ${message.typeMessage} extra-mt-x5 position-fixed`}>
                {/* "typeMessage" sera la propiedad que le dara estilo al mensaje */}
                    {/* alert es un class de bootstrap dentro de typeMessage ira el mensaje con otro class de bootstrap  */}
                <div className="text-center black-letter">
                    {/* usamos div para que no tenga mas padding el msj, text-center para centrar el contenido de las letras dentro del alert */}
                    {message.msg}
                </div>
            </div>
        </div>
    ));

Alert.propTypes = {
    alert: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    alert: state.message
    // "state.message" es la forma como accedemos al estado DEBE SER "message" o debo colocarse tal cual como este en el index de los reducer
});

export default connect(mapStateToProps)(Alert);
