// ESTE VA A SER EL COMPONENT DE LOADING MIENTRAS SE CARGAN LOS VALUE OBJECTS
import React from 'react';
import '../scss/spinner.scss';
import spinner from '../img/spinner.gif';
// spinner es sacado de un gif de google

export default () => (

    <div className="extra-mt-responsive d-flex justify-content-center">
        {/* usamos el d-flex para colocar justify-content-center y el elemento este en el medio de la pag, el extra es para controlar la posicion verticalmente */}
        <div className="ring">
            <img className="ring" src={spinner} alt='loading' />
        </div>
    </div>
);