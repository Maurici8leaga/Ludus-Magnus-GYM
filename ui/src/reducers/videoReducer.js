import { GET_LISTVIDEOS, GET_VIDEOBYID, VIDEO_ERROR, UPDATE_LIKES, CLEAR_VIDEO, CLEAR_VIDEOLIST } from '../actions/types';

const INITIAL_STATE = {
    // LOS NOMBRE QUE LE DARAS DEBE SER LOS MISMOS QUE TIENES COLOCADO CON TU ROUTE DEL BACK DONDE ESTA ALMACENADO LA DATA
    video: {},
    // "video" es 1 solo elemento, al colocar null trae problemas pero al colocarlo con {} o [] se soluciona los problemas
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
                // para poder add o remove los likes necesitamos manipular el state de los post entonces hacemos esto->
                videoList: state.videoList.map(video => video._id === payload.id ? { ...video, likes: payload.likes } : video),
                // para cada video en su like, si el id del video hace match con el el id del payload entonces agregan o remomevos el like del video
                // esto es de manera de asegurarnos que estemos haciendo like al video que queremos

            }
        case CLEAR_VIDEO:
            return{
                ...state,
                video:{}
        // de esta forma vaciamos el state de video, en este caso lo usamos para que cuando se salga de un video no quede cargado videos de anteriores videos
            }
        case CLEAR_VIDEOLIST:
            return{
                ...state,
                videoList:[]
            }
        // de esta forma vaciamos el state de videoList, en este caso lo usamos para que cuando se seleccione un musculo al cargar no traiga los datos del anterior musculo en tal caso de existir
        case VIDEO_ERROR:
            return {
                ...state,
                error: payload,
            }
        default:
            return state;
    }
}