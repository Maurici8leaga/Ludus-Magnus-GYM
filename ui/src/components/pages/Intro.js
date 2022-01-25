import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../scss/index.scss';

const Intro = ({ isSignedIn }) => {

    if (isSignedIn) {
        // colocamos esto para que el usuario cuando ya este logeado o isSignedIn sea true, no pueda acceder a este component y si lo hace lo redireccione
        return <Redirect to='/routinesType' />;
    }

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

Intro.propTypes = {
    isSignedIn: PropTypes.bool
}

const mapStatetoProps = state => ({
    isSignedIn: state.auth.isSignedIn,
});

export default connect(mapStatetoProps, {})(Intro);