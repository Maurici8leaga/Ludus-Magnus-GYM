import { GET_PROFILE, PROFILE_ERROR } from '../../src/actions/types';

const INITIAL_STATE = {
    profile : null,
    error: {}
};

export default (state = INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch(type){
        case GET_PROFILE:
            return{
                ...state,
                profile: payload,
            }
        case PROFILE_ERROR:
            return{
                ...state,
                error: payload
            }
        default:
            return state;
    }
}