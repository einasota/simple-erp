import React, {createContext, useEffect, useState} from "react";
import { IAuthProvider, Context, User } from "./types";
import { getUserLocalStorage, LoginRequest, setUserLocalStorage } from "./util";

export const AuthContext = createContext<Context>({} as Context)

export const AuthProvider = ({children}: IAuthProvider) => {
    const[user, setUser] = useState<User | null>()

    useEffect(() => {
        const user = getUserLocalStorage()
        if(user) {
            setUser(user)
        }
    }, [])

    async function authenticate(login:string, pass:string) {
        const response = await LoginRequest(login,pass)

        const payload = {token: response.token, login}
        
        setUser(payload);
        setUserLocalStorage(payload)
    }

    function logout() {
        setUser(null)
        setUserLocalStorage(null)
    }

    return (
        <AuthContext.Provider value={{...user, authenticate, logout}}>
            {children}
        </AuthContext.Provider>
    )
}