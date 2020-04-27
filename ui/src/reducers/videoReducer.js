import {GET_LISTVIDEOS, GET_VIDEOBYID, ADD_COMMENT, DELETE_COMMENT, VIDEO_ERROR, UPDATE_LIKES} from '../actions/types';

const INITIAL_STATE = {
    // LOS NOMBRE QUE LE DARAS DEBE SER LOS MISMOS QUE TIENES COLOCADO CON TU ROUTE DEL BACK DONDE ESTA ALMACENADO LA DATA
    videoId: {},
    // "videoId" es 1 solo elemento, al colocar null trae problemas pero al colocarlo con {} o [] se soluciona los problemas
    videoList: [],
    error: {}
};

export default (state = INITIAL_STATE, action) => {
    const {type, payload} = action;
    
    switch(type){
        case GET_LISTVIDEOS:
            return{
                ...state,
                videoList: payload,
            }
        case GET_VIDEOBYID:
                return{
                    ...state,
                    videoId: payload,
                }
        case ADD_COMMENT:
                return{
                    ...state,
                    videoId: {...state.videoId, comment: payload},
                    // aqui se manipula los comments de manera que devuelva los comments que se encuentren en el payload
                }
        case DELETE_COMMENT:
                return{
                    ...state,
                    comment: state.videoId.comment.filter(comment => comment._id !== payload),
                                // aqui con el "filter" se filtrara los comment de manera que devuelva todos los comment menos el que comment que coincida con el payload que ese sera el que sera removido

                }
        case UPDATE_LIKES:
                return{
                    ...state,
                    // para poder add o remove los likes necesitamos manipular el state de los post entonces hacemos esto->
                    videoList: state.videoList.map(videoId => videoId._id === payload.id ? {...videoId, likes: payload.likes} : videoId),
                                // para cada video en su like, si el id del video hace match con el el id del payload entonces agregan o remomevos el like del video
                                 // esto es de manera de asegurarnos que estemos haciendo like al video que queremos

                }
        case VIDEO_ERROR:
            return{
                ...state,
                error: payload,
            }
        default:
            return state;
    }
}