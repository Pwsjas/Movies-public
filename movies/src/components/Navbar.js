import { React, useEffect, useState } from 'react';
import { useCookies } from "react-cookie";
import { login } from '../helpers/userAPI';
import './Navbar.scss';
import PopupOverlay from '../components/PopupOverlay';

export default function Navbar(props) {

    const [visible, setVisible] = useState('transparent');
    const [searchValue, setSearchValue] = useState(props.search || '');
    const [registerWindow, setRegisterWindow] = useState();
    const [cookies, setCookie] = useCookies(["username", 'password']);
    const [verified, setVerified] = useState();
    const [loginWindow, setLoginWindow] = useState();

    useEffect(() => {
        window.addEventListener('scroll', (event) => {
          if (window.pageYOffset > 0) {
            setVisible('visible');
          } else {
            setVisible('transparent');
          }
        });
        return () => {
          window.removeEventListener('scroll', () => {});
        };
      }, []);

    useEffect(() => {
      login(cookies.username, cookies.password)
        .then((data) => {
            if (data) {
                setVerified(true);
            } else {
                setCookie('username', '', {path: '/'});
                setCookie('password', '', {path: '/'});
                setVerified(false);
            }
        })
    }, [cookies]);

    return (
        <div className={`navbar-container ${visible}`}>
            <div className='left-content'>
                <a href="/"><h1>Movie Site</h1></a>
                <img src={require('../assets/tmdb.svg').default}></img>
                <form action={`/search/${searchValue}`}>
                  <input type='text' value={searchValue} className='search-bar' placeholder="search"
                    onChange={(e) => setSearchValue(e.target.value)}>
                  </input>
                </form>
                <form action={`/search/${searchValue}`}>
                  <button className='search-button'>
                      <img className='search-icon' src={require('../assets/search.svg').default}></img>
                  </button>
                </form>
            </div>
            <div className='right-content'>
                {verified && 
                  <div>
                    <a>{cookies.username}</a>
                    <a href={`/my-list`}>My List</a>
                    <a onClick={() => setCookie('username', '', {path: '/'})}>Logout</a>
                  </div>
                }
                {!verified && 
                  <div>
                    <a onClick={() => setRegisterWindow(true)}>Register</a>
                    <a onClick={() => setLoginWindow(true)}>Login</a>
                  </div>
                }
            </div>
            {registerWindow === true && 
              <PopupOverlay popupState={setRegisterWindow} popupType='register'></PopupOverlay>
            }
            {loginWindow === true &&
              <PopupOverlay popupState={setLoginWindow} popupType='login'></PopupOverlay>
            }
        </div>
    );
};