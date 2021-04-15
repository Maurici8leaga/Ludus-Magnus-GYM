import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../scss/index.scss';

const Alert = ({ alert }) =>
    alert !== null && alert.length > 0 && alert.map(message => (
        // EL NOMBRE DE ESTA FUNCION "message" es fundamental ya que asi se podra tener acceso al ID, MSG, ETC del message
        <div key={message.id} className={`alert ${message.typeMessage}`}>
                                        {/* "typeMessage" sera la propiedad que le dara estilo al mensaje */}
            {message.msg}
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
