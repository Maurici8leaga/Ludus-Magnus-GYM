import axios from 'axios';
import {GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE} from './types';
import { messageAlert } from './messageAlert';

// Get the profile user
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
        })
    }
};

// update the user profile
export const updateProfile = (infoEdit) => async dispatch =>{

    try {

        const keyValue = { headers: { 'Content-Type': 'application/json' } };

        const res = await axios.put('http://localhost:3001/api/profile/edit', infoEdit, keyValue);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data.userUpdate
        });

        dispatch(messageAlert(res.data.msg, 'alert-warning'));
        
    } catch (error) {
        const msg = error.response.data.error.msg;

        dispatch(messageAlert(msg, 'alert-danger'))
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}

