// ESTE VA A SER EL COMPONENT DE LOADING MIENTRAS SE CARGAN LOS VALUE OBJECTS
import React from 'react';
import '../scss/spinner.scss';
import spinner from '../img/spinner.gif';
// spinner es sacado de un gif de google

export default () => (

    <div className="ring">
        <img className="ring" src={spinner} alt='loading'/>
    </div>
);