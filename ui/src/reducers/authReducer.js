import { SIGN_IN, SIGN_UP, SIGN_IN_ERROR, SIGN_UP_ERROR, LOGOUT } from '../actions/types';
import setAuthToken from '../../src/components/interceptor/setAuthToken';

const INITIAL_STATE = {
    token: localStorage.getItem('token'),
    isSignedIn: null,
    user: null,
    // ErrorMessage: ''
};

export default (state = INITIAL_STATE, action) => {

    const {type, payload} = action;

    switch(type){
        case SIGN_IN:
        case SIGN_UP:
            localStorage.setItem('token', payload.token);
            // "setItem" es un metodo para crear una clave, en este caso el "token" es el contenido que se quiere crear , y "payload.token" es el valor que va a llevar
            setAuthToken(payload.token);
            // hay que actualizar el token de esta forma, ya que si no te carga siempre el ultimo token pero no te actualizara al nuevo ingresado
            return {...state, ...payload, isSignedIn: true, user: payload };
        case SIGN_IN_ERROR:
        case SIGN_UP_ERROR:
        case LOGOUT:
            localStorage.removeItem('token');
            return {...state,token: null, isSignedIn: false}
        default:
            return state;
    }
};