// ESTE ES UN INTERCEPTOR DEL TOKEN, EL CUAL LLAMA AL TOKEN DEL BACKEN Y LE PASA HEADERS QUE ESTAN EN EL FRONT
import axios from 'axios';

const setAuthToken = token => {
    if(token){
        axios.defaults.headers.common['authorization-token-user'] = token;
    }else{
        delete axios.defaults.headers.common['authorization-token-user'];
    }
}

export default setAuthToken;