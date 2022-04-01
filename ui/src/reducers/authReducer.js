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
            setAuthToken(payload.token);
            return { ...state, ...payload, isSignedIn: true, user: payload };
        case SIGN_UP:
            localStorage.setItem('session', JSON.stringify(payload));
            setAuthToken(payload.token);
            return { ...state, ...payload, isSignedIn: true, user: payload };
        case SIGN_IN_ERROR:
        case SIGN_UP_ERROR:
        case LOGOUT:
            localStorage.removeItem('session');
            return { ...state, token: null, isSignedIn: false }
        default:
            return state;
    }
};