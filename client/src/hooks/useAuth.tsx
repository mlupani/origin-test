import { useEffect, useState } from 'react'
import users from '../api/users';
import { userStateAPI, userState } from '../interfaces/userInterface';

const useAuth = () => {

    const [isLogged, setIsLogged] = useState<boolean | null>(null);
    const [user, setUser] = useState<userState>();

    const getUser = async () => {

        users.get<userStateAPI>('/checkLogin').then(res => {
            console.log(res);
            return false;
            setIsLogged(res.data.isLogged)
            setUser(res.data.user)
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
       getUser();
    }, []);

    return {
        isLogged,
        user
    }
}

export default useAuth
