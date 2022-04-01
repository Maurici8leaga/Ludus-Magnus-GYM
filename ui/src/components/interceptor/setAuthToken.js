// This is a token interceptor
import axios from 'axios';

const setAuthToken = token => {
    if(token){
        axios.defaults.headers.common['authorization-token-user'] = token;
    }else{
        delete axios.defaults.headers.common['authorization-token-user'];
    }
}

export default setAuthToken;