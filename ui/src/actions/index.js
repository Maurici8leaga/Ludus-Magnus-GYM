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

    const keyValue = { headers: { 'Content-Type': 'application/json' } };
    // en cada post debe llevar un headers en este caso el type es 'application/json' porque es texto de un form
    const body = JSON.stringify({ email, password, name, lastname, age, height, sex, weight });
    // El "stringify" su funcion es convertir de un objeto a un string, en nuestro caso pasar la informacion agregada por el usuario pasara a reemplazarla en un string de JSON

    try {
        const response = await axios.post('http://localhost:3001/api/signup', body, keyValue);
        // esto mandara la creacion de la cuenta al API creada en el puerto 3001, "body" hace referencia al email y password

        localStorage.setItem('session', JSON.stringify(response.data));
        //"setItem" es un metodo para actualizar o crear una clave, en este el "session" es el contenido que se quiere crear o actualizar, y "response.data" es el valor que va a llevar
        // el JSON.stringify debe ir ya que localStorage no almacena un objeto, el stringify lo convierte en string para que pueda ser almacenado

        dispatch({ type: SIGN_UP, payload: response.data });
        dispatch(messageAlert('Usuario creado, Bienvenido al club', 'message-positive'));
        dispatch({ type: GET_PROFILE });
    } catch (err) {
        const error = err.response.data.error;

        if (err) {
            dispatch(messageAlert(error.msg, 'message-negative'))
        }

        // FALTA MEJORAR TODOS LOS ALERT DE ERROR
        dispatch({ type: SIGN_UP_ERROR });
    }
};

export const signIn = ({ email, password }) => async dispatch => {

    const keyValue = { headers: { 'Content-Type': 'application/json' } };
        // "'Content-Type'" OJO DEBE IR EN MINUSCULA

    const body = JSON.stringify({ email, password });
    // El "stringify" su funcion es convertir de un objeto a un string, en nuestro caso pasar la informacion agregada por el usuario pasara a reemplazarla en un string de JSON

    try {
        const response = await axios.post('http://localhost:3001/api/signin', body, keyValue);

        localStorage.setItem('session', JSON.stringify(response.data));
        //"setItem" es un metodo para actualizar o crear una clave, en este el "session" es el contenido que se quiere crear o actualizar, y "response.data" es el valor que va a llevar
        // el JSON.stringify debe ir ya que localStorage no almacena un objeto, el stringify lo convierte en string para que pueda ser almacenado

        dispatch({ type: SIGN_IN, payload: response.data });
        dispatch({ type: GET_PROFILE });
        dispatch(messageAlert(`Bienvenido ${email}`, 'message-positive'))
                                            // este ultimo "message-positive" es para indicar la propiedad que esta en el Alert que el tipo de mesaje sera esa clase
    } catch (err) {

        if (err) {
            dispatch(messageAlert('Email o Password incorrecto. Verifique intentelo de nuevo', 'message-negative'))
        }

        dispatch({ type: SIGN_IN_ERROR });
    }
};


export const signOut = () => dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT });
    dispatch(messageAlert('Adios!, cerrando sesion', 'message-positive'));
};
