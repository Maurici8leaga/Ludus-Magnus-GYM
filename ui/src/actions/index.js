import {
    SIGN_IN,
    SIGN_OUT,
    CHANGE_MUSCULO,
    CHANGE_EJERCICIO
} from './types';

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
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