import {SHOW_MODAL, HIDE_MODAL} from '../../src/actions/types';

// action for show the modal
export const showModal = () => async dispatch => {
    dispatch({type: SHOW_MODAL})
};

// action for hide the modal
export const hideModal = () => async dispatch =>{
    dispatch({type: HIDE_MODAL})
};