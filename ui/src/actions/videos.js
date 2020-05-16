import axios from 'axios';
import { GET_LISTVIDEOS, GET_VIDEOBYID, ADD_COMMENT, DELETE_COMMENT, VIDEO_ERROR, UPDATE_LIKES } from './types';
import { messageAlert } from './messageAlert';

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
        if (error) {
            dispatch(messageAlert(error.msg))
        }

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
        if (error) {
            dispatch(messageAlert(error.msg))
        }

        dispatch({
            type: VIDEO_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    };
}

// Add comment
export const addComment = (idVideo, formData) => async dispatch => {

    const KeyValue = { headers: { 'Content-Type': 'application/json' } };

    try {

        const res = await axios.post(`http://localhost:3001/api/video/comment/${idVideo}`, formData, KeyValue);

        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        })

        dispatch(messageAlert('Comentario creado'));

    } catch (error) {
        if (error) {
            dispatch(messageAlert(error.msg))
        }

        dispatch({
            type: VIDEO_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
};

// Delete comment
export const deleteComment = (idVideo, commentId) => async dispatch => {
    try {

        const res = await axios.delete(`http://localhost:3001/api/video/comment/${idVideo}/${commentId}`);

        dispatch({
            type: DELETE_COMMENT,
            payload: commentId
            // necesitamos aqui que el payload sea "commentId" para saber cual vamos a eliminar en el state y del UI 
        });

        dispatch({
            type: GET_VIDEOBYID,
            payload: res.data
        });

        dispatch(messageAlert('Comentario Eliminado'));

    } catch (error) {
        if (error) {
            dispatch(messageAlert(error.msg))
        }

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
            // en este payload se le pasa el "idVideo" ya que no es un objeto con data solamente, si no que te tambien tiene el ID del del video
            // y luego se le especifica que "likes" sera un array, y tendra una lista en ese array de los likes que le den
        });
    } catch (error) {
        if (error) {
            dispatch(messageAlert(error.msg))
        }

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

    } catch (error) {
        if (error) {
            dispatch(messageAlert(error.msg))
        }

        dispatch({
            type: VIDEO_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
};