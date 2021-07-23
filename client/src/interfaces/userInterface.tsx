export interface userState {
    id: string,
    login: string,
    password: string,
}

export interface userStateAPI {
    isLogged: boolean,
    user: userState,
}

export interface userActionsState {
    symbol: string,
    name: string,
    currency: string,
}

export interface userAction {
    id: string,
    is_user: string,
    symbol: string,
    name: string,
    currency: string,
}
