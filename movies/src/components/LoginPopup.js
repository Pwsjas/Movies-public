import { React, useState } from 'react';
import { login } from '../helpers/userAPI';
import { useCookies } from "react-cookie";
import './RegisterPopup.scss';

export default function LoginPopup(props) {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [cookies, setCookie] = useCookies(["username"]);
    const [loginFailed, setLoginFailed] = useState();

    function handleLogin(user, pw) {
        login(user, pw)
        .then((data) => {
            if (data) {
                setLoginFailed(false);
                setCookie('username', user, {path: "/"});
                setCookie('password', pw, {path: "/"});
            } else {
                setLoginFailed(true);
            }
        })
    }

    return (
        <div className='col-popup'>
            <h1>Login</h1>
            <form onSubmit={() => handleLogin(username, password)}>
                  <input type='text' value={username} className='search-bar' placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}>
                  </input>
                  <input type='password' value={password} className='search-bar' placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}>
                </input>
                { loginFailed === true &&
                    <div className='failed-login'>Username or Password is incorrect</div>
                }
            </form>
            <div className='popup-buttons'>
                <button onClick={() => props.popupState(false)}>Close</button>
                <button onClick={() => handleLogin(username, password)}>Login</button>
            </div>
        </div>
    );
};