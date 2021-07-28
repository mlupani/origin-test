import axios from 'axios';

const users = axios.create({
    baseURL: 'https://origin-test-miguel.herokuapp.com/api',
    //baseURL: 'http://localhost:3001/api',
    withCredentials: true,
})

export default users;