import {SHOW_MODAL, HIDE_MODAL} from '../../src/actions/types';

const INITIAL_STATE ={
    modalState: false
};

export default (state =  INITIAL_STATE, action) => {
    const { type } = action;

    switch(type){
        case SHOW_MODAL:
            return {
                ...state,
                modalState: true
            }
        case HIDE_MODAL:
            return{
                ...state,
                modalState: false
            }
        default:
            return state;
    }
}