import {GET_LISTVIDEOS, GET_VIDEOBYID, VIDEO_ERROR} from '../actions/types';

const INITIAL_STATE = {
    // LOS NOMBRE QUE LE DARAS DEBE SER LOS MISMOS QUE TIENES COLOCADO CON TU ROUTE DEL BACK DONDE ESTA ALMACENADO LA DATA
    videoId: {},
    // "videoId" es 1 solo elemento, al colocar null trae problemas pero al colocarlo con {} se soluciona los problemas
    videoList: [],
    error: {}
};

export default (state = INITIAL_STATE, action) => {
    const {type, payload} = action;
    
    switch(type){
        case GET_LISTVIDEOS:
            return{
                ...state,
                videoList: payload
            }
        case GET_VIDEOBYID:
                return{
                    ...state,
                    videoId: payload
                }
        case VIDEO_ERROR:
            return{
                ...state,
                error: payload
            }
        default:
            return state;
    }
}