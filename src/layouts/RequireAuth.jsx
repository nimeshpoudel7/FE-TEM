import React from 'react'
import TokenService from 'service/user-service'
import { useHistory } from "react-router-dom";

const RequireAuth = ({children}) => {
    const navigate = useHistory();
    const token= TokenService.isAuthenticatedUser()
    if(!token){
        navigate.push("/auth/login")
    }
    
    return <>{children}</>;
}

export default RequireAuth