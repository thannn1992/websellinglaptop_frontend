import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface Props{

}

interface JwtPayload{
    isAdmin: boolean;
    isStaff: boolean;
    isUser: boolean;
    isAccount: boolean;
}

const RequireUser = <P extends object> (WrappedComponent: React.ComponentType<P>) =>{
    
    const WithAdminCheck: React.FC<P> = (props) => {
        const navigate = useNavigate();
       
       
        useEffect(() =>{
            const token = localStorage.getItem('token');

            if(!token){
                navigate("/login");
                return;
            }else{
                const decodedToken = jwtDecode(token) as JwtPayload;

                const isUser = decodedToken.isUser;
              
                if(!isUser){
                    navigate("/inform-error-403");
                    return;
                }
            }
        },[navigate]);
        return<WrappedComponent {...props}/>
    }
    return WithAdminCheck;
}
export default RequireUser;