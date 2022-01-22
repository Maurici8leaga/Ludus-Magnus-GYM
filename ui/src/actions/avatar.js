import axios from 'axios';
import {  UPDATE_PROFILE, PROFILE_ERROR } from './types';
import { messageAlert } from './messageAlert';

// add a picture profile
export const uploadAvatar = (formData) => async dispatch => {
    // el formData es el que trae el file a guardar

    const keyValue = { headers: {'Content-Type': 'multipart/form-data'} }
    // cada endpoint con post debe llevar un header, en este caso el type es 'multipart/form-data' porque es una img
        // keyValue OJO DEBE IR EN MINUSCULA
    try {
        
        const res = await axios.post('http://localhost:3001/api/profile/upload', formData, keyValue );
        
        const response = await axios.get('http://localhost:3001/api/profile/me');
        // con este request despues de enviar la picture este actualizara el user 

        dispatch({
            // aca se coloca este dispatch para una vez que se envie la foto se solucita el refresh del userprofileavata
                type: UPDATE_PROFILE,
                payload: response.data
            })

        dispatch(messageAlert( res.data.msg, 'message-positive'));
        // res.data.msg es el mensaje que se coloco en el back
     } catch (error) {
         const msg = error.response.data.error;
        // dentro de msg esta contenido la frase que se quiere mostrar, y este viene del backend
        dispatch(messageAlert(msg, 'message-negative'));
        
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
            // en este payload se va a pasar un mensaje al usuario "msg" y aparte el "status" con el "e.response.status" va a mandar un 400 o algo parecido indicando el error
        })
     }
};