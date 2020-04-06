import axios from 'axios';
import {GET_LISTVIDEOS, GET_VIDEOBYID, VIDEO_ERROR} from './types';
import {messageAlert} from './messageAlert';

// Get video by muscle
export const getListVideos = (muscle) => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:3001/api/videoList?category=${muscle}`);
                                    // como este request tendra params hay que agregarle "?" + "nombre del params" + = + "el nombre del objeto donde se guardara y llamara en el component"

        dispatch({
            type: GET_LISTVIDEOS,
            payload: res.data
        })
    } catch (error) {
        if(error){
            dispatch(messageAlert(error.msg))
        }

        dispatch({
            type: VIDEO_ERROR,
            // payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
};

// Get video by id
export const getVideoById = id => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:3001/api/videoList/${id}`);

        dispatch({
            type: GET_VIDEOBYID,
            payload: res.data
        })
        
    } catch (error) {
        if(error){
            dispatch(messageAlert(error.msg))
        }

        dispatch({
            type: VIDEO_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}