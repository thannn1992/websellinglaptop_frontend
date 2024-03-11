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
                    const {jwt} = data;
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
        <form className="container col-5 mt-4">

            <h1 className="mb-4 h3 mb-3 font-weight-normal">ĐĂNG NHẬP TÀI KHOẢN</h1>
            <label htmlFor="inputEmail" className="sr-only">Tên đăng nhập </label>
            <input type="username" id="username" className="form-control my-4" placeholder="Tên đăng nhập" required
                value={username} onChange={(e) => setUserName(e.target.value)} />
            <label className="sr-only" htmlFor="inputpasword">Mật khẩu</label>
            <input type="password" id="password" className="form-control my-3" placeholder="Mật khẩu" required
                value={password} onChange={(e) => setPassword(e.target.value)} />

            <div className="checkbox mb-3">
                <label>
                    <input type="checkbox" value="remember-me" />
                    Remember me
                </label>
            </div>
            <button className="btn btn-lg btn-primary btn-block my-2" onClick={handleLogin} type="button">
                Đăng nhập
            </button>
            {error && <div style={{ color: 'red' }}>{error}</div>}

        </form>
    );
}
export default Login;

