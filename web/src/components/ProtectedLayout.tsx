import React from "react";
import { useAuth } from "../context/AuthProvider/userAuth";
import { Error401 } from "./Error401";

export function ProtectedLayout({children}:{children:JSX.Element}) {
    const auth = useAuth();
    if(!auth.login){
        return (<Error401/>)
    }
    return children 
}