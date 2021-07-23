import { useState, useEffect, useCallback } from 'react';
import twelvedata from '../api/twelvedataAPI';
import users from '../api/users';
import { Actions, Result } from '../interfaces/twelvedataAPI';
import { userAction } from '../interfaces/userInterface';

const useGetActions = (id: string) => {

    const [actions, setActions] = useState<Actions[]>([]);
    const [isLoading, setIsLoading] = useState(true)
    const [actionsUser, setActionsUser] = useState<userAction[]>([]);

    const loadActions = async () => {
        try {
            const res = await twelvedata.get<Result>('https://api.twelvedata.com/stocks?source=docs&exchange=NYSE');
            setActions(res.data.data)
            setIsLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    const loadActionsUser = useCallback(async (id) => {
        try {
            const res = await users.get<userAction[]>(`/getActionsUser?user=${id}`);
            setActionsUser(res.data)
        } catch (error) {
            console.log(error);
        }
    },[])

    useEffect(() => {
        loadActions();
        loadActionsUser(id);
    }, [loadActionsUser,id])

    return {
        actions,
        actionsUser,
        isLoading,
        loadActionsUser
    }
}

export default useGetActions
