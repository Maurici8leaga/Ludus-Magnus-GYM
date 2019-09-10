import { SIGN_IN, SIGN_ERROR } from '../actions/types';

const INITIAL_STATE = {
    isSignedIn: '',
    ErrorMessage: ''
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case SIGN_IN:
            return {...state, isSignedIn: action.payload};
        case SIGN_ERROR:
            return {...state, ErrorMessage: action.payload}
        default:
            return state;
    }
};