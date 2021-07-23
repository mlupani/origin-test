import { createContext, useState } from "react";
import { userState, userActionsState } from '../interfaces/userInterface';

const initialState = {
    user: {
        id: '',
        login: '',
        password: '',
    },
    actions: {
        symbol: '',
        name: '',
        currency: '',
    }
}

export interface userStateProps {
    user: userState,
    actions: userActionsState,
    setUsuario: ({id,login,password}: userState) => void,
    setAcciones: ({symbol, name, currency}: userActionsState) => void
}

export const userContext = createContext({} as userStateProps);

export const UserContextProvider = ({children} :any) => {

    const [user, setUser] = useState<userState>(initialState.user);
    const [actions, setActions] = useState<userActionsState>(initialState.actions);

    const setUsuario = ({id,login, password}: userState)  => {
        setUser({id,login, password})
    }

    const setAcciones = ({symbol, name, currency}: userActionsState)  => {
        setActions({symbol, name, currency})
    }

    return (
        <userContext.Provider
            value={{user, actions, setUsuario, setAcciones}}
        >
            {children}
        </userContext.Provider>
    )
}

