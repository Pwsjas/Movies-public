import { React, useRef, useState, useEffect } from 'react';
import './MovieList.scss';
import MoviePanel from './MoviePanel';
import { constructImagePath, getGenreByID } from '../helpers/dataOrganizers';

export default function MovieList(props) {

    const movieLists = [];

    let genre = '';
    if (props.movieList[0]) {
        genre = getGenreByID(props.movieList[0].mainGenre) || props.movieList[0].mainGenre;
    }

    const ref = useRef();

    const [scroll, setScroll] = useState('scroll');

    const scrollLeft = () => {
        if (scroll === 'scroll left1' || scroll === 'scroll right2') {
            setScroll('scroll right1');
        } else if (scroll === 'scroll left2' || scroll === 'scroll right3') {
            setScroll('scroll right2');
        } else if (scroll === 'scroll left3') {
            setScroll ('scroll right3');
        }
    }

    const scrollRight = () => {
        if (scroll === 'scroll' || scroll === 'scroll right1') {
            setScroll('scroll left1');
        } else if (scroll === 'scroll left1' || scroll === 'scroll right2') {
            setScroll('scroll left2');
        } else if (scroll === 'scroll left2' || scroll === 'scroll right3') {
            setScroll ('scroll left3');
        }
    }

    for (let i = 0; i < props.movieList.length; i++) {
        movieLists.push(
            <MoviePanel 
                backdrop={constructImagePath(props.movieList[i].backdrop)}
                title={props.movieList[i].title}
                key={i}
                id={props.movieList[i].movieID}>
            </MoviePanel>
        )
    }

    return (
        <div className="movielist-container">
            <h1 className='genre'>{genre}</h1>
            <div className='moviePanel-list-container'>
                <div className={scroll} ref={ref}>
                    {movieLists}
                </div>
                <div className='fade-left'>
                    <div className='left-scroll' onClick={() => scrollLeft()}>{"<"}</div>
                </div>
                <div className='fade-right'>
                    <div className='right-scroll' onClick={() => scrollRight()}>{">"}</div>
                </div>
            </div>
        </div>
    );
};

//ref={ref}
//onClick={() => scroll(-1008)}