import {
    SIGN_IN,
    SIGN_UP,
    SIGN_ERROR,
    CHANGE_MUSCULO,
    CHANGE_EJERCICIO
} from './types';
import axios from 'axios';

// export default signUp = ({email, password}) => dispatch => {

// };

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};

export const signError = () => {
    return {
        type: SIGN_ERROR
    };
};

export const changeMusculo = (musculo) => {
    return {
        type: CHANGE_MUSCULO,
        payload: musculo
    };
};

export const changeEjercicio = (ejercicio) => {
    return {
        type: CHANGE_EJERCICIO,
        payload: ejercicio
    };
};