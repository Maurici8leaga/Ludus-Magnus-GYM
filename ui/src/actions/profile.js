import axios from 'axios';
import {GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE} from './types';

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

export const updateProfile = (formData) => async dispatch =>{
                // el formdata es el que nos va a traer los datos a cambiar
    // console.log('ESTO ES FORMDATA EN EL ACTIONS UPDATE', formData);
    try {

        const KeyValue = { headers: { 'Content-Type': 'application/json' } };
    // cada endpoint con post debe llevar un header, en este caso el type es 'application/json' porque es data de un form

        const res = await axios.put('http://localhost:3001/api/profile/edit', formData, KeyValue);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}

