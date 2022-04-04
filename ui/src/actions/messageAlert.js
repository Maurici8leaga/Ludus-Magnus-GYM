import uuid from 'uuid';
import { MESSAGE_ALERT, REMOVE_MESSAGE } from './types';

export const messageAlert = (msg, typeMessage,timeOut = 5000) => dispatch => {

    // making a random id for each alert
    const id = uuid.v4();

    dispatch({
        type: MESSAGE_ALERT,
        payload: { msg, typeMessage, id }
    });

    // setting the time for remove the alert
    setTimeout(() => dispatch({ type: REMOVE_MESSAGE, payload: id }), timeOut);
}