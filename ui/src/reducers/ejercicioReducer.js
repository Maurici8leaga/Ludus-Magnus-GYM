import { CHANGE_EJERCICIO} from '../actions/types';

const INITIAL_STATE = {
    selectedEjercicio: null,
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case CHANGE_EJERCICIO:
            return {...state, selectedEjercicio: action.payload};
        default:
            return state;
    }
};
