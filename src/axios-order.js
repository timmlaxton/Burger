import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-e3005.firebaseio.com/'
});

export default instance;