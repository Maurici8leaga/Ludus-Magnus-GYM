import axios from 'axios';

const KEY = 'AIzaSyCYe44p4_ZVy3uPWwYiibXosNTiafgEErc';

export default axios.create({
    baseURL:'https://www.googleapis.com/youtube/v3',
    params:{
        part: 'snippet',
        maxResults: 10,
        key: KEY
    }
});