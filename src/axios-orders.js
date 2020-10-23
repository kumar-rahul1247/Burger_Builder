import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-c2ab2.firebaseio.com/'
});

export default instance;
