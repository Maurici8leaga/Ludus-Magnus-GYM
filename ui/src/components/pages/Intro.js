import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Intro = ({ isSignedIn }) => {

    if (isSignedIn) {
        // colocamos esto para que el usuario cuando ya este logeado o isSignedIn sea true, no pueda acceder a este component y si lo hace lo redireccione
        return <Redirect to='/routinesType' />;
    }

    return (
        <div className="pantalla">
            <div className="wrap-page">
                <div className="container" >
                    <div className="row" >
                        <div className="col">
                            <div className="px-4 py-5 my-5 text-center white-letter">
                                <h1 className="display-2 fw-bold">Ludus Magnus</h1>
                                <div className="col-lg-12 mx-auto">
                                    <p className="h4 mb-3">
                                        Comienza tu rutina ya mismo y transforma tu cuerpo como siempre lo soñaste
                                    </p>
                                    <div className="d-grid gap-1 d-sm-flex justify-content-sm-center">
                                        <Link to="/signin" className="btn boton -primary btn-lg px-4" role="button">Comenzar</Link>
                                        <Link to="/signup" className="btn boton -positive btn-lg px-4" role="button">Registrarme</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
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