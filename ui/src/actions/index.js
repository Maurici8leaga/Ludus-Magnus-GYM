import {
    SIGN_IN,
    SIGN_UP,
    SIGN_IN_ERROR,
    SIGN_UP_ERROR,
    GET_PROFILE,
    LOGOUT,
    CLEAR_PROFILE
} from './types';
import { messageAlert } from './messageAlert';
import axios from 'axios';

// registering the user
export const signUp = ({ email, password, name, lastname, birth, height, sex, weight }, user) => async dispatch => {

    const keyValue = { headers: { 'Content-Type': 'application/json' } };
    const body = JSON.stringify({ email, password, name, lastname, birth, height, sex, weight });

    try {
        // posting the info user to create a new user
        const response = await axios.post('http://localhost:3001/api/signup',  body, keyValue);

        // turning the data into a string to send it to backend
        localStorage.setItem('session', JSON.stringify(response.data));

        dispatch({ type: SIGN_UP, payload: response.data });
        dispatch(messageAlert( response.data.msg, 'alert-primary'));
        dispatch({ type: GET_PROFILE });
    } catch (err) {
        const error = err.response.data.error;
        dispatch(messageAlert(error.msg, 'alert-danger'))

        dispatch({ type: SIGN_UP_ERROR });
    }
};

// login the user
export const signIn = ({ email, password }) => async dispatch => {

    const keyValue = { headers: { 'Content-Type': 'application/json' } };
    const body = JSON.stringify({ email, password });

    try {
        // posting the info user to find a match on the user and the db
        const response = await axios.post('http://localhost:3001/api/signin', body, keyValue);

        // turning the data into a string to send it to backend
        localStorage.setItem('session', JSON.stringify(response.data));

        dispatch({ type: SIGN_IN, payload: response.data });
        dispatch({ type: GET_PROFILE });
        dispatch(messageAlert(`Welcome to Ludus Magnus ${email}`, 'alert-primary'))
    } catch (err) {
        dispatch(messageAlert('Email or Password incorrect. Please review it and try again.', 'alert-danger'))

        dispatch({ type: SIGN_IN_ERROR });
    }
};

// closing the session 
export const signOut = () => dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT });
    dispatch(messageAlert('Bye! closing session', 'alert-primary'));
};
