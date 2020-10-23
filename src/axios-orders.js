import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://YOUR__URL.firebaseio.com/'
});

export default instance;
