import axios from 'axios';
import {  UPDATE_PROFILE, PROFILE_ERROR } from './types';
import { messageAlert } from './messageAlert';

// adding a picture profile
export const uploadAvatar = (formData) => async dispatch => {

    const keyValue = { headers: {'Content-Type': 'multipart/form-data'} }
    try {
        
        // psoting the picture profile
        const res = await axios.post('http://localhost:3001/api/profile/upload', formData, keyValue );
        
        // update the user profile with new picture
        const response = await axios.get('http://localhost:3001/api/profile/me');

        dispatch({
                type: UPDATE_PROFILE,
                payload: response.data
            })

        dispatch(messageAlert( res.data.msg, 'alert-warning'));

     } catch (error) {
         const msg = error.response.data.error;

        dispatch(messageAlert(msg, 'alert-danger'));
        
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
     }
};