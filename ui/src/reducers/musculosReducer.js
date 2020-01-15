import { CHANGE_MUSCULO} from '../actions/types';

const INITIAL_STATE = {
    selectedMusculo: null,
};

export default (state = INITIAL_STATE, action) => {

    const {type, payload} = action;

    switch(type){
        case CHANGE_MUSCULO:
            return {...state, selectedMusculo: payload};
        default:
            return state;
    }
};

