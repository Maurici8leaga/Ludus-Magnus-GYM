import {MESSAGE_ALERT, REMOVE_MESSAGE} from '../actions/types';

const INITIAL_STATE = [];

export default function (state = INITIAL_STATE, action){

    const {type, payload} = action;

    switch(type){

        case MESSAGE_ALERT:
            return [...state, payload];
        case REMOVE_MESSAGE:
                            // aqui debe llamarse igual que en el componente de los alert de mensaje ya que ese es el que manda
            return state.filter(message => message.id !== payload);
                        // esto es lo que permitira es filtrar todas las alert, cuando coincida el id del alert con el del payload, ese lo va a excluir osea eliminandolo
        default:
            return state;
    }
} 