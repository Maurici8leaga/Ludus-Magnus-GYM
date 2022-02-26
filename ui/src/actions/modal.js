// Creamos estos 2 actions para poder jugar con el state del modal atravez de redux
// de esta forma el modal se puede implementar en varios component y de forma DRY
import {SHOW_MODAL, HIDE_MODAL} from '../../src/actions/types';

export const showModal = () => async dispatch => {
    // este actions es solo para abrir el modal
    dispatch({type: SHOW_MODAL})
};

export const hideModal = () => async dispatch =>{
    // este modal es solo para cerrar el modal
    dispatch({type: HIDE_MODAL})
};