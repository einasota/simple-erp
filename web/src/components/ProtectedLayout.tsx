import React from "react";
import { useAuth } from "../context/AuthProvider/userAuth";

export function ProtectedLayout({children}:{children:JSX.Element}) {
    const auth = useAuth();
    if(!auth.login){
        return <h1>Você não possui acesso.</h1>
    }
    return children 
}