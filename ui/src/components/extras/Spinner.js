import React from 'react';
import '../scss/spinner.scss';
import spinner from '../img/spinner.gif';

// Loading spinner
export default () => (

    <div className="extra-mt-responsive d-flex justify-content-center">
        <div className="ring">
            <img className="ring" src={spinner} alt='loading' />
        </div>
    </div>
);