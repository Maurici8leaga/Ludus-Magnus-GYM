import axios from 'axios';
import { UPLOAD_AVATAR } from './types';
import { messageAlert } from './messageAlert';

// add a picture profile
export const uploadAvatar = (formData) => async dispatch => {
    // el formData es el que trae el file a guardar

    const KeyValue = { headers: {'Content-Type': 'multipart/form-data'} }
    // cada endpoint con post debe llevar un header, en este caso el type es 'multipart/form-data' porque es una img
    try {
        
        const res = await axios.post('http://localhost:3001/api/profile/upload',formData , KeyValue );
        
        dispatch({
            type: UPLOAD_AVATAR,
            payload: res.data
        });

        dispatch(messageAlert('Picture profile added successfully', 'message-positive'));

     } catch (error) {
        if (error) {
            dispatch(messageAlert(error.msg, 'message-negative'));
        }
     }
};