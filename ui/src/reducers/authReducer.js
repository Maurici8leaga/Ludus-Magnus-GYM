import { SIGN_IN, SIGN_UP, SIGN_ERROR, LOGOUT } from '../actions/types';

const INITIAL_STATE = {
    token: localStorage.getItem('token'),
    isSignedIn: null,
    ErrorMessage: ''
};

export default (state = INITIAL_STATE, action) => {

    const {type, payload} = action;

    switch(type){
        case SIGN_IN:
        case SIGN_UP:
            localStorage.setItem('token', payload.token);
            // "setItem" es un metodo para actualizar o crear una clave, en este caso el "token" es el contenido que se quiere crear o actualizar, y "payload.token" es el valor que va a llevar
            return {...state, ...payload, isSignedIn: true };
        case SIGN_ERROR:
        case LOGOUT:
            localStorage.removeItem('token');
            return {...state,token: null, isSignedIn: false, ErrorMessage: payload}
        default:
            return state;
    }
};