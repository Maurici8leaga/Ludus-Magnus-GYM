import axios from 'axios';
import { UPLOAD_AVATAR } from './types';
import { messageAlert } from './messageAlert';

// add a picture profile
export const uploadAvatar = (formData) => async dispatch => {
     try {
         
        const res = await axios.post('http://localhost:3001/api/profile/upload',{formData} );

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