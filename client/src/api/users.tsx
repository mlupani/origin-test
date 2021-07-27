import axios from 'axios';

const users = axios.create({
    baseURL: 'https://origin-test-miguel.herokuapp.com/api',
    withCredentials: true,
})

export default users;