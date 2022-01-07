import axios from 'axios';
import { UPLOAD_AVATAR, UPDATE_PROFILE } from './types';
import { messageAlert } from './messageAlert';

// add a picture profile
export const uploadAvatar = (formData) => async dispatch => {
    // el formData es el que trae el file a guardar

    const KeyValue = { headers: {'Content-Type': 'multipart/form-data'} }
    // cada endpoint con post debe llevar un header, en este caso el type es 'multipart/form-data' porque es una img
    try {
        
        const res = await axios.post('http://localhost:3001/api/profile/upload',formData , KeyValue );
        
        const response = await axios.get('http://localhost:3001/api/profile/me');
        // con este request despues de enviar la picture este actualizara el user 

        dispatch({
            // aca se coloca este dispatch para una vez que se envie la foto se solucita el refresh del userprofileavata
                type: UPDATE_PROFILE,
                payload: response.data
            })

        dispatch(messageAlert('Picture profile added successfully', 'message-positive'));

     } catch (error) {
        if (error) {
            dispatch(messageAlert(error.msg, 'message-negative'));
        }
     }
};