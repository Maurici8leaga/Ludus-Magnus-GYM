import React from 'react';
import { Link } from 'react-router-dom';
import '../scss/index.scss';

const Intro = () => {
    return (
        <div className="pantalla">
            <div className="wrap-page">
                <div className="pantalla-interna">
                    <h1 className="title-big">Ludus Magnus</h1>
                    <p className="title-small">
                        Comienza tu rutina ya mismo y transforma tu cuerpo como siempre lo soñaste
                    </p>
                    <div className="buttons">
                        <Link to="/signin" className="boton -primary">Comenzar</Link>
                        <Link to="/signup" className="boton -positive">Registrarme</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Intro;