import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

interface JwtPayload {
    isAdmin: boolean;
    isUser: boolean;
    sub: string;
}

export const TakeInforJWT = () => {
    const [username, setUserName] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const userData = jwtDecode(token) as JwtPayload;

            if (userData) {
                setUserName(userData.sub + "");
                if (userData.isAdmin) {
                    setIsAdmin(true);
                }
            }
        }
    }, []
    );

    const handleLogOut = async () => {
        //Remove token from localStorage
        localStorage.removeItem('token');
        setUserName(null);
        window.location.href = "/";
    }
    const handleDirect = () => {
        window.location.href = "/update-account"
    }
    const handelDirectAddProduce = () => {
        window.location.href = "/add-produce"
    }


    return (
        <div className="user_nav">

            {isAdmin ? (
                <React.Fragment>
                    <div className="user_nav_first"><p>Xin chào,</p> </div>
                    {
                        username && <div className="user_nav_second"> <p>{username}</p>  </div>
                    }
                    <div className="user-client-account">
                        <div className="user-client-account-option">
                            <div className="user-client-account-option-button1">
                                <Link to=""><button onClick={() => handelDirectAddProduce()}><i className="fa-regular fa-user"></i> Thêm sản phẩm</button></Link>
                            </div>
                            <div className="user-client-account-option-button1">
                                <Link to=""><button onClick={() => handleDirect()}><i className="fa-regular fa-user"></i> Thông tin tài khoản</button></Link>
                            </div>
                            <div className="user-client-account-option-button1">
                                <Link to=""><button onClick={() => handleLogOut()}> <i className="fa-solid fa-arrow-right-from-bracket"></i>Đăng xuất</button></Link>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <div className="user_nav_first"><p>Xin chào,</p> </div>
                    {
                        username && <div className="user_nav_second"> <p>{username}</p>  </div>
                    }
                    <div className="user-client-account">
                        <div className="user-client-account-option">
                            <div className="user-client-account-option-button1">
                                <Link to=""><button onClick={() => handleDirect()}><i className="fa-regular fa-user"></i> Thông tin tài khoản</button></Link>
                            </div>
                            <div className="user-client-account-option-button1">
                                <Link to=""><button onClick={() => handleLogOut()}> <i className="fa-solid fa-arrow-right-from-bracket"></i>Đăng xuất</button></Link>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )}


        </div>

    )
}