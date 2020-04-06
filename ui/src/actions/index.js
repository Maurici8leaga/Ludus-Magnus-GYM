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

export const signUp = ({ email, password, name, lastname, age, height, sex, weight }, user) => async dispatch => {

    const KeyValue = { headers: { 'Content-Type': 'application/json' } };

    const body = JSON.stringify({ email, password, name, lastname, age, height, sex, weight });
    // El "stringify" su funcion es convertir de un objeto a un string, en nuestro caso pasar la informacion agregada por el usuario pasara a reemplazarla en un string de JSON

    try {
        const response = await axios.post('http://localhost:3001/api/signup', body, KeyValue);
        // esto mandara la creacion de la cuenta al API creada en el puerto 3001, "body" hace referencia al email y password

        dispatch({ type: SIGN_UP, payload: response.data });
        // localStorage.setItem('token', response.data);
        //     // "setItem" es un metodo para actualizar o crear una clave, en este casi el "token" es el contenido que se quiere crear o actualizar, y "response.data.token" es el valor que va a llevar
        dispatch(messageAlert('Perfil creado correctamente'));
        dispatch({ type: GET_PROFILE });
    } catch (err) {
        const error = err.response.data.error;

        if(err){
            dispatch(messageAlert(error.msg))
        }

            // FALTA MEJORAR TODOS LOS ALERT DE ERROR
        dispatch({ type: SIGN_UP_ERROR });
    }
};

export const signIn = ({ email, password }) => async dispatch => {

    const KeyValue = { headers: { 'Content-Type': 'application/json' } };

    const body = JSON.stringify({ email, password });
    // El "stringify" su funcion es convertir de un objeto a un string, en nuestro caso pasar la informacion agregada por el usuario pasara a reemplazarla en un string de JSON

    try {
        const response = await axios.post('http://localhost:3001/api/signin', body, KeyValue);

        dispatch({ type: SIGN_IN, payload: response.data });
        dispatch({ type: GET_PROFILE });
        dispatch(messageAlert(`Hola! Bienvenido ${email} Sesion Iniciada Correctamente`))
    } catch (err) {

        if(err){
            dispatch(messageAlert('Error al iniciar Sesion, Email o Password incorrecto. Verifique intentelo de nuevo'))
        }

        dispatch({ type: SIGN_IN_ERROR });
    }
};


// export const changeMusculo = (musculo) => {
//     return {
//         type: CHANGE_MUSCULO,
//         payload: musculo
//     };
// };

// export const changeEjercicio = (ejercicio) => {
//     return {
//         type: CHANGE_EJERCICIO,
//         payload: ejercicio
//     };
// };

export const signOut = () => dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT });
    dispatch(messageAlert('Adios!, sesion cerrada'));
};
