import React, { useState } from "react";

const Login = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {

        const loginRequest = {
            username: username,
            password: password
        };
        console.log(username);
        console.log(password);
        fetch('http://localhost:8080/api/account/login',
            {
                method: 'POST',

                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(loginRequest)
            }).then(
                (response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Đăng nhập thất bại!')
                    }
                }
            ).then(
                (data) => {
                    const { jwt } = data;
                    //save token in localStorage or cookie
                    localStorage.setItem('token', jwt);
                    setError('Đăng nhập thành công');

                }
            ).catch((error) => {
                console.error('Đăng nhập thất bại:', error);
                setError('Đăng nhập thất bại');
            })

    }

    return (
        <div className="Login_background_colour">
            <div className="container">

                <div className="Login_border">
                    <div className="Login_contain">
                        <div className="Login_form_border">
                            <form className="Login_form">
                                <h3 className="">ĐĂNG NHẬP TÀI KHOẢN</h3>
                                <div className="Login_form_email">
                                    {/* <label htmlFor="inputEmail" className="">Tên đăng nhập:</label> */}
                                    <input type="username" id="username" className="" placeholder="Tên đăng nhập" required
                                        value={username} onChange={(e) => setUserName(e.target.value)} />
                                </div>

                                <div className="Login_form_email">
                                    {/* <label className="" htmlFor="inputpasword">Mật khẩu:</label> */}
                                    <input type="password" id="password" className="" placeholder="Mật khẩu" required
                                        value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>

                                <div className="Login_form_checkbox">
                                    <label>
                                        <input type="checkbox" className="custom_checkbox_1" value="remember-me" />
                                        <p>Ghi nhớ đăng nhập</p>
                                    </label>
                                </div>
                                <div className="Login_form_bottom">
                                    <button className="" onClick={handleLogin} type="button">
                                     <h5>Đăng nhập</h5>   
                                    </button>
                                </div>
                                {error && <div style={{ color: 'red', margin: '10px 0 0 0 ' }}>{error}</div>}

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;

