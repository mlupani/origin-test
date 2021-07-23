import axios from 'axios';

const users = axios.create({
    baseURL: 'http://localhost:3001/api',
    withCredentials: true,
})

export default users;