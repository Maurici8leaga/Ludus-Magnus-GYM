import axios from 'axios';
import {GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE} from './types';
import { messageAlert } from './messageAlert';

export const getProfile = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:3001/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
            // en este payload se va a pasar un mensaje al usuario "msg" y aparte el "status" con el "e.response.status" va a mandar un 400 o algo parecido indicando el error
        })
    }
};

export const updateProfile = (infoEdit) => async dispatch =>{
                // el infoEdit es el que nos va a traer los datos a cambiar
    try {

        const keyValue = { headers: { 'Content-Type': 'application/json' } };
    // cada endpoint con post debe llevar un header, en este caso el type es 'application/json' porque es data de un form
        // "'Content-Type'" OJO DEBE IR EN MINUSCULA

        const res = await axios.put('http://localhost:3001/api/profile/edit', infoEdit, keyValue);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data.userUpdate
            // OJO aca debe ir "userUpdate" ya que asi esta puesto en el router del back, ademas de eso es que el trae la data con los 
            // datos actualizados. ESTO SE PUDO VER ATRAVES DE UN CONSOLE.LOG de res.data
        });

        dispatch(messageAlert(res.data.msg, 'message-positive'));
        
    } catch (error) {
        const msg = error.response.data.error.msg;
        // dentro de msg esta contenido la frase que se quiere mostrar, y este viene del backend
        dispatch(messageAlert(msg, 'message-negative'))

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}

