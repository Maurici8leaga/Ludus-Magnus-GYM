import { SIGN_IN, SIGN_UP, SIGN_IN_ERROR, SIGN_UP_ERROR, LOGOUT } from '../actions/types';
import setAuthToken from '../../src/components/interceptor/setAuthToken';

const INITIAL_STATE = {
    token: null,
    isSignedIn: null,
    user: null,
};

export default (state = INITIAL_STATE, action) => {

    const { type, payload } = action;

    switch (type) {
        case SIGN_IN:
            localStorage.setItem('session', JSON.stringify(payload));
            // la de idea del este session es que apenas el usuario inicie sesion se guarde sus datos dentro de este "session"
            // "setItem" es un metodo para crear o actualizar una clave, en este caso el "session" es el contenido que se quiere crear o actualizar, y "payload" es el valor que va a llevar
            setAuthToken(payload.token);
            // hay que actualizar el token de esta forma, ya que si no te carga siempre el ultimo token pero no te actualizara al nuevo ingresado
            return { ...state, ...payload, isSignedIn: true, user: payload };
        case SIGN_UP:
            localStorage.setItem('session', JSON.stringify(payload));
            // la de idea del este session es que apenas el usuario inicie sesion se guarde sus datos dentro de este "session"
            // "setItem" es un metodo para crear o actualizar una clave, en este caso el "session" es el contenido que se quiere crear o actualizar, y "payload" es el valor que va a llevar
            setAuthToken(payload.token);
            // hay que actualizar el token de esta forma, ya que si no te carga siempre el ultimo token pero no te actualizara al nuevo ingresado
            return { ...state, ...payload, isSignedIn: true, user: payload };
        case SIGN_IN_ERROR:
        case SIGN_UP_ERROR:
        case LOGOUT:
            localStorage.removeItem('session');
            // este removeitem va a eliminar del session el payload que tiene, en este caso seran los datos del usuario de manera que cuando salga se borre el token y el user
            return { ...state, token: null, isSignedIn: false }
        default:
            return state;
    }
};