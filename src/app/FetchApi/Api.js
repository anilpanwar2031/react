import axios from 'axios';

const Api = axios.create({
    // baseURL: "http://15.206.124.89/api",
    baseURL: "http://54.90.241.97/api",
});

export default Api;