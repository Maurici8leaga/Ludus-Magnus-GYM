import {
    SIGN_IN,
    SIGN_ERROR,
    CHANGE_MUSCULO,
    CHANGE_EJERCICIO
} from './types';
import axios from 'axios';

export const signUp = (formProps, callback) => async dispatch => {
    try{
        const response = await axios.post('http://localhost:3001/api/signup', formProps);
            // esto mandara la creacion de la cuenta al API creada en el puerto 3001, "formProps" hace referencia al email y password
        
        dispatch({type: SIGN_IN, payload: response.data.token});
        localStorage.setItem('token', response.data.token);
        callback();
        } catch(e) {
        dispatch({type: SIGN_ERROR, payload: 'Email en uso'});
    }
};

export const signOut = (history, path) => {
    localStorage.removeItem('token');
    history.push(path);
    return{
        type: SIGN_IN,
        payload:''
    };
};

export const signIn = (formProps, callback) => async dispatch => {

    try{
        const response = await axios.post('http://localhost:3001/api/signin', formProps);
         
        dispatch({ type: SIGN_IN, payload: response.data.token});
        localStorage.setItem('token', response.data.token);
        callback();
        } catch(e){
        dispatch({ type: SIGN_ERROR, payload: 'Usuario Invalido'});
    }
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