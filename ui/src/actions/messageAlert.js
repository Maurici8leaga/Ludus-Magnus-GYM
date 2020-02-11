import uuid from 'uuid';
import { MESSAGE_ALERT, REMOVE_MESSAGE } from './types';

export const messageAlert = (msg, timeOut = 5000) => dispatch => {

    const id = uuid.v4();
    // de esta forma generamos el random id que tendra cada alert

    dispatch({
        type: MESSAGE_ALERT,
        payload: { msg, id }
        // /aqui se pasara el mensaje del usuario y el id unico del alert
    });

    setTimeout(() => dispatch({ type: REMOVE_MESSAGE, payload: id }), timeOut);
    // "setTimeOut" permite ejecutar por el tiempo que le indiquemos y ejecute lo que se encuentra dentro, en este caso removeer el msg alert
}