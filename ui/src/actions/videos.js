import axios from 'axios';
import { GET_LISTVIDEOS, GET_VIDEOBYID, VIDEO_ERROR, UPDATE_LIKES, CLEAR_VIDEO } from './types';
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
        // dentro de msg esta contenido la frase que se quiere mostrar, y este viene del backend
        dispatch(messageAlert(msg, 'alert-danger'))

        dispatch({
            type: VIDEO_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    };
}

export const clearVideo = () => async dispatch => {
    // este actions lo que hara es cuando sea llamado limpiara el state de videoObject para que no quede imagenes o videos de otros videos 
    dispatch({ type: CLEAR_VIDEO})
}

// Add comment
export const addComment = ({ idVideo, text, alumno }) => async dispatch => {
    // se recibe del component el idvideo que es el id del video, alumno que es el id del user que hizo el comment y text que es lo que escribio

    const keyValue = { headers: { 'Content-Type': 'application/json' } };
    // "'keyValue'" OJO DEBE IR EN MINUSCULA
    const formData = JSON.stringify({ text, idVideo, alumno });
    // pasamos estos props dentro de este stringify para que convierta estos objetos en string y asi poder meterlos dentro de una variable y enviarlos al backend

    try {

        const res = await axios.post(`http://localhost:3001/api/video/comment`, formData, keyValue);

        dispatch(getVideoById(idVideo));
        // Esta es la forma de llamar un actions dentro de otro actions, al hacer esto estamos indicando que despues hacer el post
        // vamos a indicar que se ejecute lo mismo que se hace en el actions de getVideoById en este caso el motivo es para poder actualizar los comments
        // aparte se pasa como propieda "idVideo" que viene del component y este va a ser el mismo id del video en donde se comenta

        // <--OJO se llega a la conclusion de que se puede hacer esto ya que en el back los comments estan siendo creados en el mismo
        // endpoint donde se hace el getVideoById, y es viable esta forma solo por eso, si los comments se crearan de distinta forma
        // posiblemente esto no pudiese hacerse

        dispatch(messageAlert(res.data.msg, 'alert-warning'));
        // res.data.msg es el mensaje que se coloco en el back

    } catch (error) {
        const msg = error.response.data.error.msg;
        // dentro de msg esta contenido la frase que se quiere mostrar, y este viene del backend
        dispatch(messageAlert(msg, 'alert-danger'))

        dispatch({
            type: VIDEO_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
};

// Delete comment
export const deleteComment = ({ commentId, idVideo }) => async dispatch => {
    // IMPORTANTE, en la action en el component se envia como propiedad "commentId" y "idVideo" para poder eliminar el comentario y para poder hacer el get de video nuevamente
    try {

        const res = await axios.delete(`http://localhost:3001/api/video/deleteComment/${commentId}`);

        dispatch(getVideoById(idVideo));
        // Esto es llamar un actions dentro de un actions, aca estamos indicando que despues de que se ejecute el delete este 
        // ejecute lo mismo que se hace en el actions de "getVideoById", se le pasa como propiedad idVideo para que actualice los comentarios
        // si desaparezca el borrado
        // <-- OJO esta forma es posible 1ro por la forma en como son almacenados los comments 2do es que lo que se tiene en el endpoint
        // en el backend, si no fueran por esas condiciones esta forma no es viable

        dispatch(messageAlert(res.data.msg, 'alert-warning'));
        // res.data.msg es el mensaje que se coloco en el back

    } catch (error) {
        const msg = error.response.data.error.msg;
        // dentro de msg esta contenido la frase que se quiere mostrar, y este viene del backend
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
            // en este payload se le pasa el "idVideo" ya que no es un objeto con data solamente, si no que te tambien tiene el ID del del video
            // y luego se le especifica que "likes" sera un array, y tendra una lista en ese array de los likes que le den
        });

        dispatch({
            type: GET_VIDEOBYID,
            payload: res.data
        });
        // se usa este 2do dispatch de manera de cuando se ejecute el accionts este refresque la pag y pueda actualizar el numero de likes

    } catch (error) {
        const msg = error.response.data.msg;
        // dentro de msg esta contenido la frase que se quiere mostrar, y este viene del backend
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
        // se usa este 2do dispatch de manera de cuando se ejecute el accionts este refresque la pag y pueda actualizar el numero de likes


    } catch (error) {
        const msg = error.response.data.msg;
        // dentro de msg esta contenido la frase que se quiere mostrar, y este viene del backend
        dispatch(messageAlert(msg, 'alert-danger'))
        
        dispatch({
            type: VIDEO_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
};