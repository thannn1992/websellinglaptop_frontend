import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";

export const TakeInforJWT = () => {
    const [username, setUserName] = useState<string | null> (null);
    useEffect(() =>{
        const token = localStorage.getItem('token');
        if(token){
            const userData = jwtDecode(token);
            console.log(userData);
            if(userData){
                setUserName(userData.sub+"");
            }
        }
        
    },[]

    );
    return(
        <div>
            {
                username&&<div> Xin chào, {username} </div>
            }
        </div>
    )
}