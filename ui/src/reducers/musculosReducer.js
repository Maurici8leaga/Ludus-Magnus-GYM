import { CHANGE_MUSCULO} from '../actions/types';

const INITIAL_STATE = {
    selectedMusculo: null,
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case CHANGE_MUSCULO:
            return {...state, selectedMusculo: action.payload};
        default:
            return state;
    }
};

