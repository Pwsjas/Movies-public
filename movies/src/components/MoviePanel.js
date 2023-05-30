import { React, useEffect, useState } from 'react';
import { addMovie, login, addMovieToMyList, verifyMovieWithinMyList, removeMovieFromMyList } from '../helpers/userAPI';
import './MoviePanel.scss';
import { useCookies } from "react-cookie";

export default function MoviePanel(props) {

    const [hover, setHover] = useState('container');
    const [cookies, setCookie] = useCookies(["username", 'password']);
    const [colour, setColour] = useState('');
    const [currentColour, setCurrentColour] = useState('');

    let backdrop = props.backdrop;
    let title = props.title;

    function myList() {
        login(cookies.username, cookies.password)
        .then((data) => {
            if (data) {
                addMovie(props.id)
                .then((data) => {
                    addMovieToMyList(cookies.username, props.id)
                    .then(() => {
                        setColour('-green');
                        setCurrentColour('-green');
                    })
                })
            }
        })
    }

    useEffect(() => {
        if (cookies.username) {
            verifyMovieWithinMyList(cookies.username, props.id)
            .then((data) => {
                console.log(data);
                if (data) {
                    setColour('-green');
                    setCurrentColour('-green');
                } else {
                    setColour('')
                    setCurrentColour('')
                }
            })
        }
    }, []);

    function handleCurrentColour() {
        setHover('hovered');
        if (currentColour === '-green') {
            setCurrentColour('-red');
        } else {
            setCurrentColour('-green');
        }
      }
    
      function handleMouseLeaveColour() {
        setHover('');
        setCurrentColour(colour);
      }

      function handleMyListClick() {
        if (colour === '-green') {
            //Remove from myList
            login(cookies.username, cookies.password)
            .then((data) => {
                if (data) {
                    removeMovieFromMyList(cookies.username, props.id)
                    .then((data) => {
                        if (data) {
                            setColour('');
                            setCurrentColour('');
                        }
                    })
                }
            })
        } else {
            //Add to myList
            myList();
        }
      }

    return (
        <div className='container'>
            <a href={`/movie/${props.id}`}>
                <img src={backdrop} className={hover} onMouseEnter={() => setHover('hovered')} onMouseLeave={() => setHover('')}></img>
                <p className='title' onMouseEnter={() => setHover('hovered')} onMouseLeave={() => setHover('')}>{title}</p>
            </a>
            {hover === 'hovered' &&
                    <img className={`filter${currentColour} my-list-panel`} onClick={() => handleMyListClick()} src={require('../assets/add.svg').default} onMouseEnter={() => handleCurrentColour()} onMouseLeave={() => handleMouseLeaveColour()}></img>
                }
        </div>
    );
};
