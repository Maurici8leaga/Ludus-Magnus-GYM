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
                        {/* la combinacion entre el class row y col, permiten que las cosas queden una de bajo de otra */}
                        <div className="col">
                            <div className="px-4 extra-mt-responsive my-5 text-center white-letter">
                                {/* px es para padding horizontal, py es para los verticales, my para el margin vertical */}
                                <h1 className="display-2 fw-bold">Ludus Magnus</h1>
                                {/* display + numero es para hacer un gran titulo mayor que los mismos h1, fw-bold es para hacer las letras bold */}
                                <div className="col-lg-12 mx-auto">
                                    {/* el 12 del col es para que ocupe el maximo espacio que tenga posible, mx es para margin horizontal */}
                                    <p className="h4 mb-3">
                                        {/* mb es para el margin bottom, van desde el 1 al 5 */}
                                        Comienza tu rutina ya mismo y transforma tu cuerpo como siempre lo soñaste
                                    </p>
                                    <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
                                        {/* d-grid es para los display, gap + num es para la separacion entre botones */}
                                        <Link to="/signin" className="btn boton -primary btn-lg px-4" role="button">Comenzar</Link>
                                        {/* btn es el class general para los botones, btn-lg es el tamaño del boton */}
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