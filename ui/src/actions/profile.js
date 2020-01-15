import axios from 'axios';
import {GET_PROFILE, PROFILE_ERROR} from './types';

export const getProfile = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:3001/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (e) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
            // en este payload se va a pasar un mensaje al usuario "msg" y aparte el "status" con el "e.response.status" va a mandar un 400 o algo parecido indicando el error
        })
    }
}