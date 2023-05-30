import { React, useState, useEffect } from 'react';
import { getMyList, login } from '../helpers/userAPI';
import { useCookies } from "react-cookie";
import Navbar from '../components/Navbar';
import './MyList.scss';
import MoviePanel from './MoviePanel';
import { constructImagePath, formatMyList } from '../helpers/dataOrganizers';

export default function MyList(props) {

    const [cookies, setCookie] = useCookies(["username", "password"]);
    const [myList, setMyList] = useState();
    const [formattedMyList, setFormattedMyList] = useState();
    const [panels, setPanels] = useState();

    function createMyListPanels() {
        const output = [];

        for (let i = 0; i < formattedMyList.length; i++) {
            output.push(
            <MoviePanel 
                backdrop={constructImagePath(formattedMyList[i].backdrop)}
                title={formattedMyList[i].title}
                key={i}
                id={formattedMyList[i].movieID}
            ></MoviePanel>
            )
        }

        setPanels(output);
    }

    useEffect(() => {
        if (formattedMyList) {
            createMyListPanels();
        }
    }, [formattedMyList])

    useEffect(() => {
        if(myList) {
            formatMyList(myList)
            .then((data) => {
                console.log(data);
                setFormattedMyList(data);
            })
        } else {
            login(cookies.username, cookies.password)
            .then((data) => {
                if (data) {
                    console.log('logged in');
                    getMyList(cookies.username)
                    .then((data) => {
                        setMyList(data);
                    })
                }
            });
        }
    }, [myList]);

    return (
        <div>
            <Navbar></Navbar>
            <div className='myList-container'>
                    {panels}
            </div>
        </div>
    );
};