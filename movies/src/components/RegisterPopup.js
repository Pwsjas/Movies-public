import { React, useState } from 'react';
import { createNewUser } from '../helpers/userAPI';
import './RegisterPopup.scss';

export default function RegisterPopup(props) {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    return (
        <div className='col-popup'>
            <h1>Register</h1>
            <form onSubmit={() => createNewUser(username, password)}>
                  <input type='text' value={username} className='search-bar' placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}>
                  </input>
                  <input type='text' value={password} className='search-bar' placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}>
                </input>
            </form>
            <div className='popup-buttons'>
                <button onClick={() => props.popupState(false)}>Close</button>
                <button onClick={() => createNewUser(username, password)}>Register</button>
            </div>
        </div>
    );
};