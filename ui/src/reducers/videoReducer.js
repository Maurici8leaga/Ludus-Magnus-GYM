import { GET_LISTVIDEOS, GET_VIDEOBYID, VIDEO_ERROR, UPDATE_LIKES, CLEAR_VIDEO, CLEAR_VIDEOLIST } from '../actions/types';

const INITIAL_STATE = {
    video: {},
    videoList: [],
    error: {}
};

export default (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    const{video} = state;

    switch (type) {
        case GET_LISTVIDEOS:
            return {
                ...state,
                videoList: payload,
            }
        case GET_VIDEOBYID:
            return {
                ...state,
                video: {...video, ...payload}
            }
        case UPDATE_LIKES:
            return {
                ...state,
                videoList: state.videoList.map(video => video._id === payload.id ? { ...video, likes: payload.likes } : video),
            }
        case CLEAR_VIDEO:
            return{
                ...state,
                video:{}
            }
        case CLEAR_VIDEOLIST:
            return{
                ...state,
                videoList:[]
            }
        case VIDEO_ERROR:
            return {
                ...state,
                error: payload,
            }
        default:
            return state;
    }
}