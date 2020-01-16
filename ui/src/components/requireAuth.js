import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const RequireAuth = ({ component: Component, auth: {isSignedIn}, ...rest}) => (

    <Route {...rest} render={props => !isSignedIn ? (<Redirect to='/signin'/>) : (<Component {...props}/>)} />);

    RequireAuth.propTypes ={
        auth: PropTypes.object.isRequired
    }

    const mapStateToprops = state => ({
        auth: state.auth
    })

    export default connect(mapStateToprops)(RequireAuth);
