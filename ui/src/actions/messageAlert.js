import uuid from 'uuid';
import { MESSAGE_ALERT, REMOVE_MESSAGE } from './types';

export const messageAlert = (msg, typeMessage,timeOut = 5000) => dispatch => {
        // el "msg" sera el texto, el "typeMessage" es una propiedad que usaremos para poder asignar tipos de clases de message, "timeout" el tiempo de duracion del msg

    const id = uuid.v4();
    // de esta forma generamos el random id que tendra cada alert

    dispatch({
        type: MESSAGE_ALERT,
        payload: { msg, typeMessage, id }
        // /aqui se pasara el mensaje del usuario y el id unico del alert, el mensaje y el typeMessage que sera el tipo de mensaje para darle estilo al mensaje
    });

    setTimeout(() => dispatch({ type: REMOVE_MESSAGE, payload: id }), timeOut);
    // "setTimeOut" permite ejecutar por el tiempo que le indiquemos y ejecute lo que se encuentra dentro, en este caso removeer el msg alert
}