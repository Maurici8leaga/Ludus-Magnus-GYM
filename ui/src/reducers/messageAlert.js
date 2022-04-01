import {MESSAGE_ALERT, REMOVE_MESSAGE} from '../actions/types';

const INITIAL_STATE = [];

export default function (state = INITIAL_STATE, action){

    const {type, payload} = action;

    switch(type){

        case MESSAGE_ALERT:
            return [...state, payload];
        case REMOVE_MESSAGE:
            return state.filter(message => message.id !== payload);
        default:
            return state;
    }
} 