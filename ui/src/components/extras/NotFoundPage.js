import React from 'react';
import '../scss/index.scss';

const NotFoundPage = () => {
    return (
        <div className="notfound">
            <h1 >
                ERROR 404 <i className='fas fa-exclamation-triangle' /> Page not found
            </h1>
            <p >Sorry, this page does not exist</p>
        </div>
    );
}

export default NotFoundPage;
