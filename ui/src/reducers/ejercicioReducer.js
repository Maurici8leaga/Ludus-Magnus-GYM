import { CHANGE_EJERCICIO} from '../actions/types';

const INITIAL_STATE = {
    selectedEjercicio: null,
};

export default (state = INITIAL_STATE, action) => {

    const {type, payload} = action;

    switch(type){
        case CHANGE_EJERCICIO:
            return {...state, selectedEjercicio: payload};
        default:
            return state;
    }
};
