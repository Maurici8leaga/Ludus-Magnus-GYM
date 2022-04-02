import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Intro = ({ isSignedIn }) => {

      // redirect once the user has logged there the user can't access this page once has been logged
    if (isSignedIn) {
        return <Redirect to='/routinesType' />;
    }

    return (
        <div className="screen">
            <div className="wrap-page">
                <div className="container" >
                    <div className="row" >
                        <div className="col">
                            <div className="px-4 extra-mt-responsive my-5 text-center white-letter">

                                <h1 className="display-2 fw-bold">Ludus Magnus</h1>

                                <div className="col-lg-12 mx-auto">
                                    <p className="h4 mb-3">
                                        Start your routine right now and change your body like you always dreamed of
                                    </p>
                                    <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
                                        <Link to="/signin" className="btn button -primary btn-lg px-4" role="button">Sign In</Link>
                                        <Link to="/signup" className="btn button -positive btn-lg px-4" role="button">Sign Up</Link>
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