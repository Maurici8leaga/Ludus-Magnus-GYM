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

// ESTE NO ES UN COMPONENT ESTO ES JAVASCRIPT ,POR ESO NO SE IMPORT REACT NI NADA, ESTE SE PUEDE IMPORTAR A CUALQUIER COMPONET QUE SE NECESITE