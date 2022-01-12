import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, UPDATE_PROFILE } from '../../src/actions/types';

const INITIAL_STATE = {
    ProfileUser : {},
    repos: [],
    error: {}
};

export default (state = INITIAL_STATE, action) => {
    const {type, payload} = action;
    
    switch(type){
        case GET_PROFILE:
            case UPDATE_PROFILE:
                return{
                    ...state,
                    ProfileUser: payload,
            }
        case PROFILE_ERROR:
            return{
                ...state,
                error: payload
            }
        case CLEAR_PROFILE:
            return{
                ...state,
                ProfileUser: null,
                repos: []
            }
        default:
            return state;
    }
}