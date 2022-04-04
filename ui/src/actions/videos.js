import axios from 'axios';
import { GET_LISTVIDEOS, GET_VIDEOBYID, VIDEO_ERROR, UPDATE_LIKES, CLEAR_VIDEO, CLEAR_VIDEOLIST } from './types';
import { messageAlert } from './messageAlert';

// Get video by muscle
export const getListVideos = (muscle) => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:3001/api/videoList?category=${muscle}`);

        dispatch({
            type: GET_LISTVIDEOS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: VIDEO_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
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
        const msg = error.response.data.error.msg;
        dispatch(messageAlert(msg, 'alert-danger'))

        dispatch({
            type: VIDEO_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    };
}

// refreshing the state of video
export const clearVideo = () => async dispatch => {
    dispatch({ type: CLEAR_VIDEO})
}

// refreshing the state of videoList
export const clearVideoList = () => async dispatch => {
    dispatch({ type: CLEAR_VIDEOLIST})
}

// Add comment
export const addComment = ({ idVideo, text, student }) => async dispatch => {

    const keyValue = { headers: { 'Content-Type': 'application/json' } };
    const formData = JSON.stringify({ text, idVideo, student });

    try {

        const res = await axios.post(`http://localhost:3001/api/video/comment`, formData, keyValue);

        dispatch(getVideoById(idVideo));

        dispatch(messageAlert(res.data.msg, 'alert-warning'));

    } catch (error) {
        const msg = error.response.data.error.msg;

        dispatch(messageAlert(msg, 'alert-danger'))

        dispatch({
            type: VIDEO_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
};

// Delete comment
export const deleteComment = ({ commentId, idVideo }) => async dispatch => {

    try {

        const res = await axios.delete(`http://localhost:3001/api/video/deleteComment/${commentId}`);

        dispatch(getVideoById(idVideo));

        dispatch(messageAlert(res.data.msg, 'alert-warning'));

    } catch (error) {
        const msg = error.response.data.error.msg;
        dispatch(messageAlert(msg, 'alert-danger'))
        dispatch({
            type: VIDEO_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
};

// Like a video
export const like = (idVideo) => async dispatch => {
    try {

        const res = await axios.put(`http://localhost:3001/api/video/like/${idVideo}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { idVideo, likes: res.data }
        });

        dispatch({
            type: GET_VIDEOBYID,
            payload: res.data
        });

    } catch (error) {
        const msg = error.response.data.msg;

        dispatch(messageAlert(msg, 'alert-danger'))
        dispatch({
            type: VIDEO_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
};

// Dislike a video
export const dislike = (idVideo) => async dispatch => {
    try {

        const res = await axios.put(`http://localhost:3001/api/video/dislike/${idVideo}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { idVideo, likes: res.data }
        });

        dispatch({
            type: GET_VIDEOBYID,
            payload: res.data
        });


    } catch (error) {
        const msg = error.response.data.msg;
        
        dispatch(messageAlert(msg, 'alert-danger'))
        
        dispatch({
            type: VIDEO_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
};